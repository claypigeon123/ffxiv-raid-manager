package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.response;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.RaidAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetRaidResponse {
    private RaidAggregate raid;
    private List<UserAggregate> users;
}
