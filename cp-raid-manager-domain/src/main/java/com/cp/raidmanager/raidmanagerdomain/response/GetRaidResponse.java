package com.cp.raidmanager.raidmanagerdomain.response;

import com.cp.raidmanager.raidmanagerdomain.aggregate.RaidAggregate;
import com.cp.raidmanager.raidmanagerdomain.aggregate.UserAggregate;
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
