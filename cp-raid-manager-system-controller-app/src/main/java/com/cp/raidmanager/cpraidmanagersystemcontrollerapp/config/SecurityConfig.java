package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config.properties.JwtProperties;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config.properties.SecurityProperties;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import reactor.core.publisher.Mono;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

import static com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.model.Role.*;

@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public Key secretKey(JwtProperties jwtProperties) {
        byte[] decoded = Decoders.BASE64.decode(jwtProperties.getSecret());
        return new SecretKeySpec(decoded, SignatureAlgorithm.HS512.getJcaName());
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(
        ServerHttpSecurity http,
        JwtReactiveAuthenticationManager manager,
        JwtReactiveSecurityContextRepository ctxRepo,
        SecurityProperties securityProperties
    ) {
        return http
            .cors().configurationSource(corsConfigurationSource(securityProperties)).and()
            .csrf().disable()

            .exceptionHandling()
            .authenticationEntryPoint((ex, e) ->
                Mono.fromRunnable(() -> ex.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED))
            )
            .accessDeniedHandler((ex, e) ->
                Mono.fromRunnable(() -> ex.getResponse().setStatusCode(HttpStatus.FORBIDDEN))
            )
            .and()

            .authenticationManager(manager)
            .securityContextRepository(ctxRepo)

            .authorizeExchange(exchange -> exchange
                .pathMatchers(HttpMethod.POST,
                    "/api/auth",
                    "/api/users/register"
                ).permitAll()

                .pathMatchers(HttpMethod.POST,
                    "/api/raids"
                ).hasAnyRole(RAID_LEADER.toString(), ADMIN.toString())

                .pathMatchers(HttpMethod.PUT,
                    "/api/raids/*/confirm-signup",
                    "/api/raids/*/unconfirm-signup"
                ).hasAnyRole(RAID_LEADER.toString(), ADMIN.toString())

                .anyExchange().authenticated()
            )

            .httpBasic().disable()
            .formLogin().disable()
            .logout().disable()
            .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(SecurityProperties securityProperties) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(securityProperties.getAllowedOrigins());
        config.setAllowedMethods(securityProperties.getAllowedMethods());
        config.setAllowCredentials(securityProperties.getAllowCredentials());
        config.setAllowedHeaders(securityProperties.getAllowedHeaders());
        config.setExposedHeaders(securityProperties.getExposedHeaders());

        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", config);
        return src;
    }
}
