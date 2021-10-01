package com.cp.raidmanager.raidmanagerdomain.request;

import com.cp.raidmanager.raidmanagerdomain.model.Job;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConfirmSignupRequest {
    private String userId;
    private Job job;
}
