package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl.RaidAggregatesRepository;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl.UserAggregatesRepository;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.RaidAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.model.ConfirmedSignup;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.model.Job;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.model.Signup;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.ConfirmSignupRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.CreateRaidRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.RaidSignupRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.request.UnconfirmSignupRequest;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.response.GetRaidResponse;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.response.GetRaidsResponse;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.AggregateNotFoundException;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.BadRequestException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple3;

import java.time.Clock;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
@RequiredArgsConstructor
public class RaidService {

    private final RaidAggregatesRepository raidDao;
    private final UserAggregatesRepository userDao;
    private final Clock clock;
    private final DateTimeFormatter dtf;
    private final MailerService mailer;
    //private final EventEmitterComponent emitter;

    public Mono<GetRaidsResponse> getCurrentRaids() {
        Query query = new Query();

        query.addCriteria(where("raidDateTime").gte(OffsetDateTime.now(clock).format(dtf)));
        query.with(Sort.by("raidDateTime").descending());

        return raidDao.query(query)
            .collectList()
            .map(GetRaidsResponse::new);
    }

    public Mono<GetRaidsResponse> getOldRaids(Integer limit, Integer offset) {
        Query query = new Query();

        query.addCriteria(where("raidDateTime").lte(OffsetDateTime.now(clock).format(dtf)));
        query.limit(limit == null ? 20 : limit);
        query.skip(offset == null ? 0 : offset);
        query.with(Sort.by("raidDateTime").descending());

        return raidDao.query(query)
            .collectList()
            .map(GetRaidsResponse::new);
    }

    public Mono<GetRaidResponse> getRaid(String id) {
        return findRaid(id)
            .zipWhen(raid -> {
                var signups = raid.getSignups().keySet();
                if (signups.isEmpty()) {
                    return Mono.just(new ArrayList<UserAggregate>());
                }
                return userDao.query(query(where("id").in(signups.toArray()))).collectList();
            })
            .map(tuple2 -> GetRaidResponse.builder()
                .raid(tuple2.getT1())
                .users(tuple2.getT2())
                .build()
            );
    }

    public Mono<RaidAggregate> createRaid(CreateRaidRequest request, String createdBy) {
        return Mono.just(RaidAggregate.fromRequest(request, createdBy, OffsetDateTime.now(clock).format(dtf)))
            .flatMap(raidDao::upsert)
            .flatMap(raidAggregate -> sendRaidPostedEmails(createdBy, raidAggregate)
                .thenReturn(raidAggregate)
            );
    }

    public Mono<RaidAggregate> signup(String raidId, RaidSignupRequest request, String requester) {
        return findUserAndRaid(raidId, requester)
            .flatMap(tuple3 -> signupForRaid(tuple3.getT1(), tuple3.getT2(), tuple3.getT3(), request));
    }

    public Mono<RaidAggregate> signoff(String raidId, String requester) {
        return findUserAndRaid(raidId, requester)
            .flatMap(tuple3 -> signoffFromRaid(tuple3.getT1(), tuple3.getT2(), tuple3.getT3()));
    }

    public Mono<RaidAggregate> confirmSignup(String requester, String raidId, ConfirmSignupRequest request) {
        return findUserAndRaid(raidId, request.getUserId())
            .flatMap(tuple3 -> confirmSignupForRaid(requester, tuple3.getT1(), tuple3.getT2(), tuple3.getT3(), request));
    }

    public Mono<RaidAggregate> unconfirmSignup(String requester, String raidId, UnconfirmSignupRequest request) {
        return findUserAndRaid(raidId, request.getUserId())
            .flatMap(tuple3 -> unconfirmSignupForRaid(requester, tuple3.getT1(), tuple3.getT2(), tuple3.getT3()));
    }

    public Mono<RaidAggregate> attachLog(String raidId, String link) {
        return findRaid(raidId)
            .flatMap(raid -> attachLogToRaid(raid, link));
    }

    public Mono<Void> delete(String raidId) {
        return findRaid(raidId)
            .flatMap(raid -> raidDao.deleteById(raid.getId()));
    }

    // --- helpers ---

    private Mono<Tuple3<String, UserAggregate, RaidAggregate>> findUserAndRaid(String raidId, String userId) {
        return Mono.zip(
            Mono.just(OffsetDateTime.now(clock).format(dtf)),
            findUser(userId),
            findRaid(raidId)
        );
    }

    private Mono<UserAggregate> findUser(String userId) {
        return userDao.findById(userId)
            .switchIfEmpty(Mono.error(new AggregateNotFoundException()));
    }

    private Mono<RaidAggregate> findRaid(String raidId) {
        return raidDao.findById(raidId)
            .switchIfEmpty(Mono.error(new AggregateNotFoundException()));
    }

    private Mono<Void> sendRaidPostedEmails(String from, RaidAggregate raid) {
        return userDao.query(Query.query(where("wantsEmails").is(true)))
            .doOnNext(user -> mailer.sendRaidPosted(from, user, raid))
            .then();
    }

    private Mono<Void> sendConfirmationEmail(String from, UserAggregate to, RaidAggregate raid) {
        return Mono.just(from)
            .doOnNext(approver -> mailer.sendSignupConfirmed(approver, to, raid))
            .then();
    }

    private Mono<RaidAggregate> signupForRaid(String now, UserAggregate user, RaidAggregate raid, RaidSignupRequest request) {
        String id = user.getId();
        Map<String, Signup> signups = raid.getSignups();
        Signup signup = Signup.builder()
            .signupDate(now)
            .preference(request.getPreference())
            .alternates(sortJobs(request.getAlternates()))
            .build();

        if (signups.containsKey(id)) {
            signup.setSignupDate(signups.get(id).getSignupDate());
        }

        if (request.getAlternates().contains(request.getPreference())) {
            signup.getAlternates().remove(request.getPreference());
        }

        signups.put(id, signup);
        raid.setSignups(signups);
        raid.setUpdatedDate(now);
        return raidDao.upsert(raid);
            //.doOnSuccess(i -> emitter.emitSignup(user.getId(), raid.getName()));
    }

    private Mono<RaidAggregate> signoffFromRaid(String now, UserAggregate user, RaidAggregate raid) {
        String id = user.getId();
        var signups = raid.getSignups();
        var confirmedSignups = raid.getConfirmedSignups();

        if (!signups.containsKey(id) && !confirmedSignups.containsKey(id)) {
            throw new BadRequestException("You attempted to sign off from a raid you weren't signed up for in the first place");
        }

        signups.remove(id);
        confirmedSignups.remove(id);

        raid.setSignups(signups);
        raid.setConfirmedSignups(confirmedSignups);
        raid.setUpdatedDate(now);
        return raidDao.upsert(raid);
            //.doOnSuccess(i -> emitter.emitSignoff(user.getId(), raid.getName()));
    }

    private Mono<RaidAggregate> confirmSignupForRaid(String requester, String now, UserAggregate user, RaidAggregate raid, ConfirmSignupRequest request) {
        String id = user.getId();
        Map<String, Signup> signups = raid.getSignups();

        if (!signups.containsKey(id)) {
            throw new BadRequestException("User hasn't signed up for this raid");
        }

        Signup signup = signups.get(id);
        if (!signup.getPreference().equals(request.getJob()) && !signup.getAlternates().contains(request.getJob())) {
            throw new BadRequestException("The job you tried to assign to this user was not selected by them");
        }

        Map<String, ConfirmedSignup> confirmedSignups = raid.getConfirmedSignups();
        confirmedSignups.put(id, ConfirmedSignup.builder().job(request.getJob()).build());
        raid.setConfirmedSignups(confirmedSignups);
        raid.setUpdatedDate(now);

        return raidDao.upsert(raid)
            .flatMap(raidAggregate -> sendConfirmationEmail(requester, user, raidAggregate)
                .thenReturn(raidAggregate)
            );
            //.doOnSuccess(i -> emitter.emitSignupConfirmation(requester, user.getId(), raid.getName()));
    }

    private Mono<RaidAggregate> unconfirmSignupForRaid(String requester, String now, UserAggregate user, RaidAggregate raid) {
        String id = user.getId();
        Map<String, ConfirmedSignup> confirmedSignups = raid.getConfirmedSignups();

        if (!confirmedSignups.containsKey(id)) {
            throw new BadRequestException("The user you tried to remove wasn't confirmed for this raid in the first place");
        }

        confirmedSignups.remove(id);
        raid.setConfirmedSignups(confirmedSignups);
        raid.setUpdatedDate(now);

        return raidDao.upsert(raid);
            //.doOnSuccess(i -> emitter.emitSignupConfirmationCancellation(requester, user.getId(), raid.getName()));
    }

    private Mono<RaidAggregate> attachLogToRaid(RaidAggregate aggregate, String link) {
        aggregate.setLog(link);
        aggregate.setUpdatedDate(OffsetDateTime.now(clock).format(dtf));
        return raidDao.upsert(aggregate);
    }

    private List<Job> sortJobs(List<Job> jobs) {
        return jobs.stream()
            .sorted(Enum::compareTo)
            .collect(Collectors.toList());
    }
}
