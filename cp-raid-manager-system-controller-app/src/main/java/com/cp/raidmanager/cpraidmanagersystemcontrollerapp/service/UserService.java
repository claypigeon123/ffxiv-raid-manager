package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.AggregatesReactiveRepository;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.ChangeUserDetailsRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.RegisterRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.AggregateNotFoundException;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.time.Clock;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AggregatesReactiveRepository<UserAggregate, String> userDao;
    private final Clock clock;
    private final DateTimeFormatter dtf;
    private final BCryptPasswordEncoder passwordEncoder;

    public Mono<UserAggregate> findOne(String value) {
        return userDao.findById(value);
    }

    public Mono<UserAggregate> register(RegisterRequest request) {
        return validateAndPrepareForInsert(request)
            .flatMap(userDao::insert);
    }

    public Mono<UserAggregate> changeDetails(ChangeUserDetailsRequest request, String id) {
        return userDao.findById(id)
            .switchIfEmpty(Mono.error(new AggregateNotFoundException()))
            .flatMap(aggregate -> changeDetails(aggregate, request));
    }

    // --- helpers ---

    private Mono<UserAggregate> validateAndPrepareForInsert(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords didn't match");
        }

        return Mono.just(UserAggregate.fromRegisterRequest(
            request,
            OffsetDateTime.now(clock).format(dtf),
            passwordEncoder.encode(request.getPassword())
        ));
    }

    private Mono<UserAggregate> changeDetails(UserAggregate aggregate, ChangeUserDetailsRequest request) {
        if (request.getPassword() != null && request.getConfirmPassword() != null) {
            aggregate.setPassword(changePassword(request.getPassword(), request.getConfirmPassword()));
        }

        if (request.getServer() != null) {
            aggregate.setServer(request.getServer());
        }

        if (request.getInGameName() != null) {
            aggregate.setInGameName(request.getInGameName());
        }

        return userDao.upsert(aggregate);
    }

    private String changePassword(String p, String cP) {
        if (!p.equals(cP)) {
            throw new BadRequestException("Passwords didn't match");
        }

        return passwordEncoder.encode(p);
    }
}
