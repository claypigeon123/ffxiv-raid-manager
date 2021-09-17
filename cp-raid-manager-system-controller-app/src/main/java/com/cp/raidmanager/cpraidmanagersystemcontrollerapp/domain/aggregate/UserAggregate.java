package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.model.Role;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.RegisterRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserAggregate {
    private String id;

    private String createdDate;

    private String updatedDate;

    private String username;

    @JsonIgnore
    private String password;

    private String inGameName;

    private Role role;

    public static UserAggregate fromRegisterRequest(RegisterRequest request, String now, String hash) {
        return UserAggregate.builder()
            .id(request.getUsername())
            .createdDate(now)
            .updatedDate(now)
            .password(request.getPassword())
            .username(request.getUsername())
            .password(hash)
            .inGameName(request.getInGameName())
            .role(Role.USER)
            .build();
    }
}
