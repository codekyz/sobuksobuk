package reading.project.global.exception;

import org.springframework.http.HttpStatus;

public record ErrorResponse(
        Integer status,
        String errorCode,
        String message
) {
    public static ErrorResponse from(ErrorCode errorCode) {
        return new ErrorResponse(null, errorCode.name(), errorCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), null, httpStatus.getReasonPhrase());
    }
}
