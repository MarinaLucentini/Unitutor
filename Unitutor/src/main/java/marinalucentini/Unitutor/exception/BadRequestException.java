package marinalucentini.Unitutor.exception;

import lombok.Getter;
import org.springframework.validation.ObjectError;

import java.util.List;
@Getter
public class BadRequestException extends RuntimeException{
    private List<ObjectError> objectErrorList;
    public BadRequestException(String message){
        super(message);
    }
    public BadRequestException (List<ObjectError> objectErrorList){
        super("Ci sono stati errori di validazione nel payload");
        this.objectErrorList = objectErrorList;
    }
}
