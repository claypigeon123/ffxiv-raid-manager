package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl.UserAggregatesRepository;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.ChangeUserDetailsRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.RegisterRequest;
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
