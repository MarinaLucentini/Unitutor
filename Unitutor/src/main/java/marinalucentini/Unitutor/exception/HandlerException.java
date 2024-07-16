package marinalucentini.Unitutor.exception;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class HandlerException {
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDto handleBadRequest(BadRequestException ex) {
        if (ex.getObjectErrorList() != null) {

            String message = ex.getObjectErrorList().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.joining(". "));
            return new ErrorDto(message);

        } else {

            return new ErrorDto(ex.getMessage());
        }

    }
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorDto handleNotFound(NotFoundException ex){
        return new ErrorDto(ex.getMessage());
    }
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDto handleGenericError(Exception ex){
        return  new ErrorDto(ex.getMessage());
    }
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus (HttpStatus.FORBIDDEN)
    public ErrorDto handleUnauthorized(UnauthorizedException ex){
        return new ErrorDto(ex.getMessage());
    }
}
