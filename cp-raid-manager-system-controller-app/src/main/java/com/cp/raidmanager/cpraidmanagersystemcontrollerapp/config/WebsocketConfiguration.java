package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config;

import com.cp.raidmanager.raidmanagerdomain.websocket.Event;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.controller.NotificationsController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Sinks.Many;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class WebsocketConfiguration {

    @Bean
    public Many<Event> eventSink() {
        return Sinks.many().multicast().onBackpressureBuffer();
    }

    @Bean
    public Flux<Event> events() {
        return eventSink().asFlux();
    }

    @Bean
    public List<Event> lastEvents() {
        return new ArrayList<>();
    }

    @Bean
    public HandlerMapping webSocketHandlerMapping(NotificationsController notificationsController) {
        Map<String, WebSocketHandler> processors = new HashMap<>();
        processors.put("/ws/notifications", notificationsController);

        SimpleUrlHandlerMapping handlerMapping = new SimpleUrlHandlerMapping();
        handlerMapping.setOrder(1);
        handlerMapping.setUrlMap(processors);
        return handlerMapping;
    }

    @Bean
    public WebSocketHandlerAdapter webSocketHandlerAdapter() {
        return new WebSocketHandlerAdapter();
    }
}
