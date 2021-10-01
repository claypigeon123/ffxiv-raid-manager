package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.controller;

import com.cp.raidmanager.raidmanagerdomain.aggregate.UserAggregate;
import com.cp.raidmanager.raidmanagerdomain.request.AuthRequest;
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
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/public")
public class PublicController {
    private final Logger log = LoggerFactory.getLogger(PublicController.class);

    private final PublicService service;

    @PostMapping("/auth")
    public Mono<ResponseEntity<UserAggregate>> auth(@RequestBody AuthRequest request) {
        log.info("Request to authenticate [{}]", request.getUsername());
        return service.auth(request);
    }

    @PostMapping("/renew")
    public Mono<ResponseEntity<UserAggregate>> renew(ServerWebExchange ex) {
        String id = ex.getAttribute("requesterId");
        log.info("Request to renew token of [{}]", id);
        return service.renew(id);
    }
}
