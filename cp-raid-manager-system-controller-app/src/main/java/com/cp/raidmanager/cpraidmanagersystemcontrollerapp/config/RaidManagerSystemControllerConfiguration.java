package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.Clock;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Configuration
public class RaidManagerSystemControllerConfiguration {

    @Bean
    public DateTimeFormatter offsetDateTime() {
        return DateTimeFormatter.ISO_OFFSET_DATE_TIME
            .withZone(ZoneId.of(ZoneOffset.UTC.getId()));
    }

    @Bean
    public Clock clock() {
        return Clock.systemUTC();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public String userCollectionName() {
        return "users";
    }

    @Bean
    public String raidCollectionName() {
        return "raids";
    }
}
