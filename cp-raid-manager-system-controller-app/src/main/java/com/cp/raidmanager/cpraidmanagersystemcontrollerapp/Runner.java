package com.cp.raidmanager.cpraidmanagersystemcontrollerapp;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config.properties.SecurityProperties;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Runner implements CommandLineRunner {
    private final Logger log = LoggerFactory.getLogger(Runner.class);

    @Override
    public void run(String... args) throws Exception {
        // HS512
        var key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        log.info("key: {}", key.getEncoded());
        var encoded = Encoders.BASE64.encode(key.getEncoded());
        log.info("encoded: {}", encoded);
    }
}
