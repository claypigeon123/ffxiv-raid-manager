package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.websocket;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.websocket.Event;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.base.RaidManagerSystemControllerException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Sinks.Many;

import java.time.Clock;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

import static com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.websocket.EventType.*;

@Component
@RequiredArgsConstructor
public class EventEmitterComponent {
    private final Many<Event> eventSink;
    private final Clock clock;
    private final DateTimeFormatter dtf;

    public void emitSignup(String user, String raid) {
        eventSink.emitNext(
            Event.builder()
            .type(RAID_SIGNUP)
            .timestamp(OffsetDateTime.now(clock).format(dtf))
            .msg(String.format("%s signed up for %s", user, raid))
            .build(),
            ((signalType, emitResult) -> { throw new RaidManagerSystemControllerException(); })
        );
    }

    public void emitSignoff(String user, String raid) {
        eventSink.emitNext(
            Event.builder()
                .type(RAID_SIGNOFF)
                .timestamp(OffsetDateTime.now(clock).format(dtf))
                .msg(String.format("%s cancelled their signup for %s", user, raid))
                .build(),
            ((signalType, emitResult) -> { throw new RaidManagerSystemControllerException(); })
        );
    }

    public void emitSignupConfirmation(String confirmer, String user, String raid) {
        eventSink.emitNext(
            Event.builder()
                .type(RAID_CONFIRM)
                .timestamp(OffsetDateTime.now(clock).format(dtf))
                .msg(String.format("%s confirmed %s for raid %s", confirmer, user, raid))
                .build(),
            ((signalType, emitResult) -> { throw new RaidManagerSystemControllerException(); })
        );
    }

    public void emitSignupConfirmationCancellation(String confirmer, String user, String raid) {
        eventSink.emitNext(
            Event.builder()
                .type(RAID_UNCONFIRM)
                .timestamp(OffsetDateTime.now(clock).format(dtf))
                .msg(String.format("%s cancelled confirmation of %s for raid %s", confirmer, user, raid))
                .build(),
            ((signalType, emitResult) -> { throw new RaidManagerSystemControllerException(); })
        );
    }
}
