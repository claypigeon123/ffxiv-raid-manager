package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.controller;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.RaidAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.*;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.response.GetRaidResponse;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.response.GetRaidsResponse;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service.RaidService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/raids")
public class RaidController {
    private final Logger log = LoggerFactory.getLogger(RaidController.class);

    private final RaidService raidService;

    @GetMapping("/query/current")
    @ResponseStatus(HttpStatus.OK)
    public Mono<GetRaidsResponse> getCurrentRaids() {
        log.info("Request to get current raids");
        return raidService.getCurrentRaids();
    }

    @GetMapping("/query/old")
    @ResponseStatus(HttpStatus.OK)
    public Mono<GetRaidsResponse> getOldRaids(
        @RequestParam(required = false) Integer limit,
        @RequestParam(required = false) Integer offset
    ) {
        log.info("Request to get old raids");
        return raidService.getOldRaids(limit, offset);
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public Mono<GetRaidResponse> getRaid(@PathVariable String id) {
        log.info("Request to get raid {}", id);
        return raidService.getRaid(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<RaidAggregate> createRaid(@RequestBody CreateRaidRequest request, ServerWebExchange ex) {
        String id = ex.getAttribute("requesterId");
        log.info("Request to create new raid by [{}]", id);
        return raidService.createRaid(request, id);
    }

    @PutMapping("/{raidId}/signup")
    @ResponseStatus(HttpStatus.OK)
    public Mono<RaidAggregate> signup(@PathVariable String raidId, @RequestBody RaidSignupRequest request, ServerWebExchange ex) {
        String requester = ex.getAttribute("requesterId");
        log.info("Request from {} to sign up for raid {}", requester, raidId);
        return raidService.signup(raidId, request, requester);
    }

    @PutMapping("/{raidId}/signoff")
    @ResponseStatus(HttpStatus.OK)
    public Mono<RaidAggregate> signoff(@PathVariable String raidId, ServerWebExchange ex) {
        String requester = ex.getAttribute("requesterId");
        log.info("Request from {} to sign off from raid {}", requester, raidId);
        return raidService.signoff(raidId, requester);
    }

    @PutMapping("/{raidId}/confirm-signup")
    @ResponseStatus(HttpStatus.OK)
    public Mono<RaidAggregate> confirmSignup(@PathVariable String raidId, @RequestBody ConfirmSignupRequest request, ServerWebExchange ex) {
        String requester = ex.getAttribute("requesterId");
        log.info("Request by {} to confirm signup of {} on raid {} as {}", requester, request.getUserId(), raidId, request.getJob());
        return raidService.confirmSignup(requester, raidId, request);
    }

    @PutMapping("/{raidId}/unconfirm-signup")
    @ResponseStatus(HttpStatus.OK)
    public Mono<RaidAggregate> confirmSignup(@PathVariable String raidId, @RequestBody UnconfirmSignupRequest request, ServerWebExchange ex) {
        String requester = ex.getAttribute("requesterId");
        log.info("Request by {} to unconfirm signup of {} on raid {}", requester, request.getUserId(), raidId);
        return raidService.unconfirmSignup(requester, raidId, request);
    }

    @PutMapping("/{raidId}/attach-log")
    @ResponseStatus(HttpStatus.OK)
    public Mono<RaidAggregate> attachLog(@PathVariable String raidId, @RequestBody AttachLogRequest request) {
        log.info("Request to attach log to raid {}", raidId);
        return raidService.attachLog(raidId, request.getLink());
    }
}
