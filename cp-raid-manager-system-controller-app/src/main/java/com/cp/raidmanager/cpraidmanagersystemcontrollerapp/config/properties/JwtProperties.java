package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config.properties;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@NoArgsConstructor
@ConfigurationProperties(prefix = "raid-manager.security.jwt")
public class JwtProperties {
    private String headerKey;
    private String prefix;
    private Integer expiration;
    private String secret;
}
