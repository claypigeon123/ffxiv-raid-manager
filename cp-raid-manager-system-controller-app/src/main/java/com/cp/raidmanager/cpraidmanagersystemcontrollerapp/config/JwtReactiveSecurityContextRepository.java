package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class JwtReactiveSecurityContextRepository implements ServerSecurityContextRepository {

    private final JwtReactiveAuthenticationManager manager;

    @Override
    public Mono<Void> save(ServerWebExchange exchange, SecurityContext context) {
        throw new UnsupportedOperationException("Not supported");
    }

    @Override
    public Mono<SecurityContext> load(ServerWebExchange exchange) {
        return Mono.justOrEmpty(exchange.getRequest().getHeaders().getFirst("Authorization"))
            .filter(authHeader -> authHeader.startsWith("Bearer "))
            .flatMap(authHeader -> {
                String authToken = authHeader.split(" ")[1];
                Authentication auth = new UsernamePasswordAuthenticationToken(authToken, authToken);
                return manager.authenticate(auth)
                    .doOnNext(a -> exchange.getAttributes().put("requesterId", a.getPrincipal()))
                    .map(SecurityContextImpl::new);
            });
    }
}
