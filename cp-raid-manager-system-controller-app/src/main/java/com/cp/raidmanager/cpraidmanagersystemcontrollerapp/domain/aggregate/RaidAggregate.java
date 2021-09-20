package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.model.ConfirmedSignup;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.model.Signup;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.CreateRaidRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RaidAggregate {
    private String id;

    private String createdDate;

    private String updatedDate;

    private String name;

    private String createdBy;

    private String raidDateTime;

    private String log;

    private Map<String, Signup> signups;

    private Map<String, ConfirmedSignup> confirmedSignups;

    public static RaidAggregate fromRequest(CreateRaidRequest request, String createdBy, String now) {
        return RaidAggregate.builder()
            .id(UUID.randomUUID().toString())
            .createdDate(now)
            .updatedDate(now)
            .name(request.getName())
            .log(null)
            .createdBy(createdBy)
            .raidDateTime(request.getRaidDateTime())
            .signups(new HashMap<>())
            .confirmedSignups(new HashMap<>())
            .build();
    }
}
