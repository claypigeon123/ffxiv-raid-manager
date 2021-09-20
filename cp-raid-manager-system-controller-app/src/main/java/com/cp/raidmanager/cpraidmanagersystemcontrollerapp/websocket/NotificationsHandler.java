package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.websocket;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.websocket.Event;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.base.RaidManagerSystemControllerException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class NotificationsHandler implements WebSocketHandler {
    private final Flux<Event> events;
    private final ObjectMapper objectMapper;

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        return events
            .doOnNext(event -> sendMessage(session, event))
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
