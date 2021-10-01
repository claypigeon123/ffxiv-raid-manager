package com.cp.raidmanager.raidmanagerdomain.websocket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Event {
    private EventType type;
    private String msg;
    private String timestamp;
}
