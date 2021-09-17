package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.response;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.RaidAggregate;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetRaidsResponse {
    private List<RaidAggregate> documents;
}
