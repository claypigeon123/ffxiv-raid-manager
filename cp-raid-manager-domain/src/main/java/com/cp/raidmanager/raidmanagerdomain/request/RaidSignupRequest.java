package com.cp.raidmanager.raidmanagerdomain.request;

import com.cp.raidmanager.raidmanagerdomain.model.Job;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RaidSignupRequest {
    private Job preference;

    private List<Job> alternates;
}
