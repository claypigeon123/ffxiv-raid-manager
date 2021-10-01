package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl.UserAggregatesRepository;
import com.cp.raidmanager.raidmanagerdomain.aggregate.UserAggregate;
import com.cp.raidmanager.raidmanagerdomain.request.ChangeUserDetailsRequest;
import com.cp.raidmanager.raidmanagerdomain.request.RegisterRequest;
import com.cp.raidmanager.raidmanagerdomain.response.RegisterResponse;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.AggregateNotFoundException;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Clock;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserAggregatesRepository userDao;
    private final Clock clock;
    private final DateTimeFormatter dtf;
    private final BCryptPasswordEncoder passwordEncoder;

    public Mono<UserAggregate> findOne(String value) {
        return userDao.findById(value);
    }

    public Flux<UserAggregate> batchFind(List<String> ids) {
        return userDao.query(query(where("id").in(ids)));
    }

    public Mono<RegisterResponse> register(RegisterRequest request) {
        return validateAndInsert(request);
    }

    public Mono<RegisterResponse> resetPassword(RegisterRequest request) {
        return userDao.findById(request.getUsername())
            .switchIfEmpty(Mono.error(new AggregateNotFoundException()))
            .flatMap(this::resetPasswordOf);
    }

    public Mono<UserAggregate> changeDetails(ChangeUserDetailsRequest request, String id) {
        return userDao.findById(id)
            .switchIfEmpty(Mono.error(new AggregateNotFoundException()))
            .flatMap(aggregate -> changeDetails(aggregate, request));
    }

    // --- helpers ---

    private Mono<RegisterResponse> validateAndInsert(RegisterRequest request) {
        String tempPassword = UUID.randomUUID().toString();

        return Mono.just(UserAggregate.fromRegisterRequest(request, OffsetDateTime.now(clock).format(dtf), passwordEncoder.encode(tempPassword)))
            .flatMap(userDao::insert)
            .map(aggregate -> RegisterResponse.builder()
                .id(aggregate.getId())
                .tempPassword(tempPassword)
                .build()
            );
    }

    private Mono<RegisterResponse> resetPasswordOf(UserAggregate aggregate) {
        String tempPassword = UUID.randomUUID().toString();
        String encoded = passwordEncoder.encode(tempPassword);

        aggregate.setPassword(encoded);
        return userDao.upsert(aggregate)
            .map(saved -> RegisterResponse.builder()
                .id(saved.getId())
                .tempPassword(tempPassword)
                .build()
            );
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

        if (request.getEmail() != null) {
            aggregate.setEmail(request.getEmail());
        }

        if (request.getWantsEmails() != null) {
            aggregate.setWantsEmails(request.getWantsEmails());
        }

        aggregate.setUpdatedDate(OffsetDateTime.now(clock).format(dtf));
        return userDao.upsert(aggregate);
    }

    private String changePassword(String p, String cP) {
        if (!p.equals(cP)) {
            throw new BadRequestException("Passwords didn't match");
        }

        return passwordEncoder.encode(p);
    }
}
