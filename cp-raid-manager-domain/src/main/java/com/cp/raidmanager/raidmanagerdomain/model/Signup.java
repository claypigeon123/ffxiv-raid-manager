package com.cp.raidmanager.raidmanagerdomain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Signup {
    private Job preference;

    private List<Job> alternates;

    private String signupDate;
}
