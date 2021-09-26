package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl.UserAggregatesRepository;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.UnauthorizedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.security.Key;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtReactiveAuthenticationManager implements ReactiveAuthenticationManager {

    private final Key secretKey;
    private final UserAggregatesRepository userDao;

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        return Mono.just(authentication)
            .map(this::parseJwt)
            .onErrorResume(it -> Mono.empty())
            .flatMap(this::verifyUser)
            .map(claims -> new UsernamePasswordAuthenticationToken(
                claims.getSubject(),
                null,
                new ArrayList<>(List.of(new SimpleGrantedAuthority(claims.get("role", String.class)))))
            );
    }

    private Claims parseJwt(Authentication authentication) {
        return Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws((String) authentication.getCredentials())
            .getBody();
    }

    private Mono<Claims> verifyUser(Claims claims) {
        return userDao.findById(claims.getSubject())
            .switchIfEmpty(Mono.error(new UnauthorizedException()))
            .thenReturn(claims);
    }
}
