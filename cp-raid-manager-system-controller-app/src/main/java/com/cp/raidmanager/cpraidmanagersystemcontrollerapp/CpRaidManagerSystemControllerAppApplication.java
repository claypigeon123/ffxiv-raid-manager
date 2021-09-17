package com.cp.raidmanager.cpraidmanagersystemcontrollerapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.couchbase.repository.config.EnableReactiveCouchbaseRepositories;

@SpringBootApplication
@EnableReactiveCouchbaseRepositories
public class CpRaidManagerSystemControllerAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(CpRaidManagerSystemControllerAppApplication.class, args);
    }
}
