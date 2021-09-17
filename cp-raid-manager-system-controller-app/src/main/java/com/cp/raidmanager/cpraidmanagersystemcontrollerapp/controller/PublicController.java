package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.controller;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.AuthRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service.PublicService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PublicController {
    private final Logger log = LoggerFactory.getLogger(PublicController.class);

    private final PublicService service;

    @PostMapping("/auth")
    public Mono<ResponseEntity<UserAggregate>> auth(@RequestBody AuthRequest request) {
        log.info("Request to authenticate [{}]", request.getUsername());
        return service.auth(request);
    }
}
