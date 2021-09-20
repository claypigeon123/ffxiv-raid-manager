package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttachLogRequest {
    private String link;
}
