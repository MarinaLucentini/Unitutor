package marinalucentini.Unitutor.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import marinalucentini.Unitutor.subject.Subject;
import marinalucentini.Unitutor.subject.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class FirebaseStorageService {
    @Autowired
    SubjectService subjectService;
    public String uploadFile(UUID id, MultipartFile file) throws IOException {
        Subject subject = subjectService.findById(id);
        String fileName = subject.getName() + "-" + file.getOriginalFilename();
        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.create("audios/" + UUID.randomUUID() + "-" + fileName, file.getBytes(), file.getContentType());
        return blob.getMediaLink();
    }
}
