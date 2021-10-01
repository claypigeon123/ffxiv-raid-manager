package com.cp.raidmanager.raidmanagerdomain.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateRaidRequest {
    private String name;

    private String raidDateTime;
}
