package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.controller;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.RegisterRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

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

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<UserAggregate> register(@RequestBody RegisterRequest request) {
        log.info("Request to register new user aggregate");
        return service.register(request);
    }
}
