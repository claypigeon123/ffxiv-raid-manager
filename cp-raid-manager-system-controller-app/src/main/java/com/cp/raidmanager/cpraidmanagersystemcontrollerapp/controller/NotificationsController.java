package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.controller;

import com.cp.raidmanager.raidmanagerdomain.websocket.Event;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.base.RaidManagerSystemControllerException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationsController implements WebSocketHandler {
    private final Logger log = LoggerFactory.getLogger(NotificationsController.class);

    private final Flux<Event> events;
    private final ObjectMapper objectMapper;
    private final List<Event> lastEvents;

    public NotificationsController(Flux<Event> events, ObjectMapper objectMapper, List<Event> lastEvents) {
        this.events = events;
        this.objectMapper = objectMapper;
        this.lastEvents = lastEvents;
    }

    //@GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Flux<Event> getLatest() {
        log.info("Request to get latest notifications");
        return Flux.fromIterable(lastEvents);
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        /*return events
            .doOnNext(event -> sendMessage(session, event))
            .then();*/
        return Mono.empty()
            .then();
    }

    private void sendMessage(WebSocketSession session, Event event) {
        WebSocketMessage text;
        try {
            text = session.textMessage(objectMapper.writeValueAsString(event));
        } catch (JsonProcessingException ignored) {
            throw new RaidManagerSystemControllerException();
        }

        session.send(Mono.just(text))
            .subscribe();
    }
}
