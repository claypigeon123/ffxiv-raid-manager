package com.cp.raidmanager.raidmanagerdomain.response;

import com.cp.raidmanager.raidmanagerdomain.aggregate.RaidAggregate;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetRaidsResponse {
    private List<RaidAggregate> documents;
}
