package no.nav.navnosearchapi.common.errorhandler

import jakarta.servlet.http.HttpServletRequest
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.slf4j.event.Level
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.time.LocalDateTime

@ControllerAdvice
class ErrorHandler {

    val logger: Logger = LoggerFactory.getLogger(ErrorHandler::class.java)

    @ExceptionHandler(value = [MethodArgumentNotValidException::class])
    fun missingRequestParamHandler(
        ex: MethodArgumentNotValidException,
        request: HttpServletRequest
    ): ResponseEntity<ErrorResponse> {
        return handleException(
            status = HttpStatus.BAD_REQUEST,
            message = "Påkrevd request parameter mangler: ${ex.bindingResult.fieldError?.field}",
            path = request.requestURI,
            ex = ex
        )
    }

    @ExceptionHandler(value = [MissingServletRequestParameterException::class])
    fun missingRequestParamHandler(
        ex: MissingServletRequestParameterException,
        request: HttpServletRequest
    ): ResponseEntity<ErrorResponse> {
        return handleException(
            status = HttpStatus.BAD_REQUEST,
            message = "Påkrevd request parameter mangler: ${ex.parameterName}",
            path = request.requestURI,
            ex = ex
        )
    }

    @ExceptionHandler(value = [Throwable::class])
    fun defaultExceptionHandler(ex: Throwable, request: HttpServletRequest): ResponseEntity<ErrorResponse> {
        return handleException(
            status = HttpStatus.INTERNAL_SERVER_ERROR,
            message = "Ukjent feil",
            path = request.requestURI,
            ex = ex
        )
    }

    private fun handleException(
        status: HttpStatus,
        message: String? = null,
        path: String,
        ex: Throwable
    ): ResponseEntity<ErrorResponse> {
        val error = ErrorResponse(
            timestamp = LocalDateTime.now(),
            status = status.value(),
            error = status.reasonPhrase,
            message = message ?: ex.message,
            path = path
        )

        logger.atLevel(if (status.is5xxServerError) Level.ERROR else Level.WARN).log(error.message, ex)
        return ResponseEntity(error, status)
    }
}