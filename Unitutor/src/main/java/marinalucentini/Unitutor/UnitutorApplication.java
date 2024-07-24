package marinalucentini.Unitutor;

import marinalucentini.Unitutor.config.FirebaseStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UnitutorApplication {
@Autowired
	FirebaseStorageService firebaseStorageService;
	public static void main(String[] args) {
		SpringApplication.run(UnitutorApplication.class, args);


	}

}
