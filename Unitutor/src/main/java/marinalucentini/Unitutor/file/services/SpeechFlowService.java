package marinalucentini.Unitutor.file.services;

import org.cloudinary.json.JSONArray;
import org.cloudinary.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;


@Service
public class SpeechFlowService {
    @Value("${speech.flow.key.id}")
    private String apiKeyId;

    @Value("${speech.flow.key.secret}")
    private String apiKeySecret;

    private static final String LANG = "it";
    private static final int RESULT_TYPE = 1; // Formato di output desiderato

    public String transcribeAudio(String  filePath) throws Exception {
        Map<String, String> requestHeader = new HashMap<>();
        boolean isRemote = filePath.startsWith("http");
        requestHeader.put("keyId", apiKeyId);
        requestHeader.put("keySecret", apiKeySecret);
        Map<String, String> params = new HashMap<>();
        params.put("lang", LANG);
        Map<String, String> files = new HashMap<>();
        if (isRemote) {
            params.put("remotePath", filePath);
        } else {
            files.put("file", filePath);
        }
        String taskId = create(requestHeader, params, files);
        if (taskId != null) {
            return query(taskId);
        }
        return null;
    }

    private String create(Map<String, String> requestHeader, Map<String, String> params, Map<String, String> files) throws Exception {
        String createUrl = "https://api.speechflow.io/asr/file/v1/create";
        URL url = new URL(createUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("accept", "text/html, application/xhtml+xml, image/jxr, */*");
        connection.setRequestProperty("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0");
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setRequestMethod("POST");
        int timeoutDuration = 5 * 60 * 1000;
        connection.setConnectTimeout(timeoutDuration);
        connection.setReadTimeout(timeoutDuration);
        String requestEncoding = "UTF-8";
        String responseEncoding = "UTF-8";
        if (requestHeader != null && requestHeader.size() > 0) {
            for (Map.Entry<String, String> entry : requestHeader.entrySet()) {
                connection.setRequestProperty(entry.getKey(), entry.getValue());
            }
        }
        OutputStream out;
        if (files == null || files.size() == 0) {
            System.out.println("submitting a remote file");
            connection.setRequestProperty("content-type", "application/x-www-form-urlencoded");
            out = new DataOutputStream(connection.getOutputStream());
            if (params != null && params.size() > 0) {
                StringBuilder formData = new StringBuilder();
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    formData.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
                }
                formData.delete(formData.length() - 1, formData.length());
                out.write(formData.toString().getBytes(requestEncoding));
            }
        } else {
            System.out.println("submitting a local file");
            String boundary = "-----------------------------" + System.currentTimeMillis();
            connection.setRequestProperty("content-type", "multipart/form-data; boundary=" + boundary);
            out = new DataOutputStream(connection.getOutputStream());
            if (params != null && params.size() > 0) {
                StringBuilder sbFormData = new StringBuilder();
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    sbFormData.append("--" + boundary + "\r\n");
                    sbFormData.append("Content-Disposition: form-data; name=\"" + entry.getKey() + "\"\r\n\r\n");
                    sbFormData.append(entry.getValue() + "\r\n");
                }
                out.write(sbFormData.toString().getBytes(requestEncoding));
            }
            for (Map.Entry<String, String> entry : files.entrySet()) {
                String fileName = entry.getKey();
                String filePath = entry.getValue();
                if (fileName == null || fileName.isEmpty() || filePath == null || filePath.isEmpty()) {
                    continue;
                }
                File file = new File(filePath);
                if (!file.exists()) {
                    continue;
                }
                out.write(("--" + boundary + "\r\n").getBytes(requestEncoding));
                out.write(("Content-Disposition: form-data; name=\"" + fileName + "\"; filename=\"" + file.getName() + "\"\r\n").getBytes(requestEncoding));
                out.write(("Content-Type: application/x-msdownload\r\n\r\n").getBytes(requestEncoding));
                DataInputStream in = new DataInputStream(new FileInputStream(file));
                int bytes;
                byte[] bufferOut = new byte[1024];
                while ((bytes = in.read(bufferOut)) != -1) {
                    out.write(bufferOut, 0, bytes);
                }
                in.close();
                out.write(("\r\n").getBytes(requestEncoding));
            }
            out.write(("--" + boundary + "--\r\n").getBytes(requestEncoding));
        }
        out.flush();
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), responseEncoding));
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        out.close();
        reader.close();
        String responseContent = stringBuilder.toString();
        System.out.println(responseContent);
        JSONObject jsonObject = new JSONObject(responseContent);
        int code = jsonObject.getInt("code");
        if (code == 10000) {
            String taskId = jsonObject.getString("taskId");
            return taskId;
        } else {
            System.out.println("create error: ");
            System.out.println(jsonObject.getString("msg"));
            return null;
        }
    }

    private String query(String taskId) throws Exception {

        String queryUrl = "https://api.speechflow.io/asr/file/v1/query";
        String queryData = "?taskId=" + taskId + "&resultType=" + RESULT_TYPE;
        HttpURLConnection conn;
        BufferedReader in;
        while (true) {
            URL url = new URL(queryUrl + queryData);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("keyId", apiKeyId);
            conn.setRequestProperty("keySecret", apiKeySecret);
            conn.setDoOutput(false);
            in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder stringBuilder = new StringBuilder();
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                stringBuilder.append(inputLine);
            }
            in.close();

            String responseContent = stringBuilder.toString();
            JSONObject jsonObject = new JSONObject(responseContent);
            int code = jsonObject.getInt("code");
            if (code == 11000) {


                return jsonObject.getString("result");
            } else if (code == 11001) {
                System.out.println("waiting");
                Thread.sleep(3000);
            } else {
                System.out.println(responseContent);
                System.out.println("transcription error:");
                System.out.println(jsonObject.getString("msg"));
                return null;
            }
        }
    }
    public String parseTranscriptionResult(String jsonResponse) {
        JSONObject jsonObject = new JSONObject(jsonResponse);
        JSONArray sentencesArray = jsonObject.getJSONArray("sentences");

        StringBuilder transcription = new StringBuilder();

        for (int i = 0; i < sentencesArray.length(); i++) {
            JSONArray words = sentencesArray.getJSONObject(i).getJSONArray("words");


            for (int j = 0; j < words.length(); j++) {
                transcription.append(words.getJSONObject(j).getString("w")).append(" ");

            }

            transcription.append(" ");
        }

        return transcription.toString().trim();
    }
}