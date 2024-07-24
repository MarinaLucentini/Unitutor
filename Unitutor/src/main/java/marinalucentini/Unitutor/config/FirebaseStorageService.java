package marinalucentini.Unitutor.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class FirebaseStorageService {
    @Autowired
    SubjectService subjectService;

    @Value("${firebase.storage.bucket}")
    private  String bucketName;
    public String uploadFile(UUID id, MultipartFile file) throws IOException {
        Subject subject = subjectService.findById(id);
        String fileName = subject.getName() + "-" + file.getOriginalFilename();
        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.create("audios/" + id + "-" + fileName, file.getBytes(), file.getContentType());
        return blob.getMediaLink();
    }
    public InputStream downloadFile(String fileName) throws IOException {
        String fullPath = "audios/" + fileName;
        System.out.println("Trying to download file from path: " + fullPath);
        System.out.println("Downloading file: " + fullPath);
        listBucketContents();
        Blob blob = StorageClient.getInstance().bucket().get(fullPath);

        if (blob == null) {
            System.err.println("File not found: " + fullPath);
            throw new IOException("File not found" + fullPath);
        }
        return new ByteArrayInputStream(blob.getContent());
    }

    public void listBucketContents() {
        Bucket bucket = StorageClient.getInstance().bucket();
        System.out.println("Listing files in bucket: " + bucket.getName());
        for (Blob blob : bucket.list().iterateAll()) {
            System.out.println("File in bucket: " + blob.getName());
        }
    }
}
