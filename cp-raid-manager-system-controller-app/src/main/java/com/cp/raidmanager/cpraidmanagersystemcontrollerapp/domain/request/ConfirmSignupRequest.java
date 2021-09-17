package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.model.Job;
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
