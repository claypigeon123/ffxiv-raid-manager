package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.controller.advice;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.AggregateNotFoundException;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.BadRequestException;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.ErrorResponse;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.UnauthorizedException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import reactor.core.publisher.Mono;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AggregateNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Mono<ErrorResponse> aggregateNotFound(AggregateNotFoundException e) {
        return Mono.just(ErrorResponse.builder()
            .msg(e.getMessage())
            .build()
        );
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Mono<ErrorResponse> badRequest(BadRequestException e) {
        return Mono.just(ErrorResponse.builder()
            .msg(e.getMessage())
            .build()
        );
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Mono<ErrorResponse> badRequest(UnauthorizedException e) {
        return Mono.just(ErrorResponse.builder()
            .msg(e.getMessage())
            .build()
        );
    }

    @ExceptionHandler(DuplicateKeyException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Mono<ErrorResponse> duplicateUsername() {
        return Mono.just(ErrorResponse.builder()
            .msg("Username already in use")
            .build()
        );
    }
}
