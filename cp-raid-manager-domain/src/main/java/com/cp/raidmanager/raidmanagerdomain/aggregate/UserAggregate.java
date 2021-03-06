package com.cp.raidmanager.raidmanagerdomain.aggregate;

import com.cp.raidmanager.raidmanagerdomain.model.Role;
import com.cp.raidmanager.raidmanagerdomain.request.RegisterRequest;
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

    private String email;

    private Boolean wantsEmails;

    @JsonIgnore
    private String password;

    private String server;

    private String inGameName;

    private Role role;

    public static UserAggregate fromRegisterRequest(RegisterRequest request, String now, String hash) {
        return UserAggregate.builder()
            .id(request.getUsername())
            .createdDate(now)
            .updatedDate(now)
            .username(request.getUsername())
            .password(hash)
            .server("change me")
            .inGameName("change me")
            .email("change me")
            .wantsEmails(true)
            .role(Role.USER)
            .build();
    }
}
