package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config.properties.JwtProperties;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl.UserAggregatesRepository;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.AuthRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.UnauthorizedException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.security.Key;
import java.time.Clock;
import java.time.OffsetDateTime;
import java.util.Date;

import static org.springframework.data.couchbase.core.query.Query.query;
import static org.springframework.data.couchbase.core.query.QueryCriteria.where;

@Service
@RequiredArgsConstructor
public class PublicService {

    private final UserAggregatesRepository userDao;
    private final Key secretKey;
    private final JwtProperties jwtProperties;
    private final Clock clock;
    private final BCryptPasswordEncoder encoder;

    public Mono<ResponseEntity<UserAggregate>> auth(AuthRequest request) {
        return userDao.findOne(query(where("username").is(request.getUsername())))
            .switchIfEmpty(Mono.error(new UnauthorizedException("Incorrect username or password")))
            .flatMap(aggregate -> verifyPassword(request.getPassword(), aggregate))
            .switchIfEmpty(Mono.error(new UnauthorizedException("Incorrect username or password")))
            .flatMap(this::generateTokenIntoEntity);
    }

    public Mono<ResponseEntity<UserAggregate>> renew(String id) {
        return userDao.findOne(query(where("username").is(id)))
            .switchIfEmpty(Mono.error(new UnauthorizedException()))
            .flatMap(this::generateTokenIntoEntity);
    }

    // --- helpers ---

    private Mono<UserAggregate> verifyPassword(String raw, UserAggregate user) {
        if (encoder.matches(raw, user.getPassword())) {
            return Mono.just(user);
        }

        return Mono.empty();
    }

    private Mono<ResponseEntity<UserAggregate>> generateTokenIntoEntity(UserAggregate user) {
        long now = OffsetDateTime.now(clock).toInstant().getEpochSecond() * 1000;
        String token = Jwts.builder()
            .setSubject(user.getId())
            .claim("role", user.getRole().toString())
            .setIssuedAt(new Date(now))
            .setExpiration(new Date(now + jwtProperties.getExpiration() * 1000))
            .signWith(secretKey)
            .compact();

        return Mono.just(
            ResponseEntity.ok()
                .header(jwtProperties.getHeaderKey(), jwtProperties.getPrefix() + token)
                .body(user)
        );
    }
}
