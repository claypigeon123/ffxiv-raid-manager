package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.AggregatesReactiveRepository;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.RegisterRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Clock;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

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
}
