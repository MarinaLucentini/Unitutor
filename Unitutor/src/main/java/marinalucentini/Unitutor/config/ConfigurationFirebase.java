package marinalucentini.Unitutor.config;

import com.cloudinary.Cloudinary;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.remoteconfig.FirebaseRemoteConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;

import java.io.IOException;


@Configuration
public class ConfigurationFirebase {
    @Value("${firebase.key}")
    private String firebaseKeyPath;
    @Value("${firebase.project.id}")
    private String firebaseProjectId;
    @Value("${firebase.storage.bucket}")
    private String firebaseStorageBucket;
    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        FileInputStream serviceAccount = new FileInputStream(firebaseKeyPath);

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setProjectId(firebaseProjectId)
                .setStorageBucket(firebaseStorageBucket)
                .build();

        return FirebaseApp.initializeApp(options);
    }

}
