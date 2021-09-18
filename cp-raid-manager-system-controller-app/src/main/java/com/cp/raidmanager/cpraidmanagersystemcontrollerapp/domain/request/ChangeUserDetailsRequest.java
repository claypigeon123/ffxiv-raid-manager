package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChangeUserDetailsRequest {
    private String password;

    private String confirmPassword;

    private String server;

    private String inGameName;
}
