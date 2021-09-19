package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.controller;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.ChangeUserDetailsRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.RegisterRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService service;

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<UserAggregate> findOne(@PathVariable String id) {
        log.info("Request to get user by id: {}", id);
        return service.findOne(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Flux<UserAggregate> batchFind(@RequestBody List<String> ids) {
        log.info("Request to batch get users");
        return service.batchFind(ids);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<UserAggregate> register(@RequestBody RegisterRequest request) {
        log.info("Request to register new user aggregate");
        return service.register(request);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public Mono<UserAggregate> changeDetails(@RequestBody ChangeUserDetailsRequest request, ServerWebExchange ex) {
        String id = ex.getAttribute("requesterId");
        log.info("Request to change details of {}", id);
        return service.changeDetails(request, id);
    }
}
