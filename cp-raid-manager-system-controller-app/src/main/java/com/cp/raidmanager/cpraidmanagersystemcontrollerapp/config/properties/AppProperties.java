package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config.properties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@NoArgsConstructor
@AllArgsConstructor
@ConfigurationProperties(prefix = "raid-manager.app")
public class AppProperties {
    private Long artificialDelayMs;
}
