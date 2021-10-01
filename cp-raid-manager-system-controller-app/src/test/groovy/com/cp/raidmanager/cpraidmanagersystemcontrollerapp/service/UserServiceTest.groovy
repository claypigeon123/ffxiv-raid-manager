package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.AggregatesReactiveRepository
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl.UserAggregatesRepository
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.AggregateNotFoundException
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.BadRequestException
import com.cp.raidmanager.raidmanagerdomain.aggregate.UserAggregate
import com.cp.raidmanager.raidmanagerdomain.model.Role
import com.cp.raidmanager.raidmanagerdomain.request.ChangeUserDetailsRequest
import com.cp.raidmanager.raidmanagerdomain.request.RegisterRequest
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import spock.lang.Specification

import java.time.Clock
import java.time.Instant
import java.time.OffsetDateTime
import java.time.ZoneId
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

class UserServiceTest extends Specification {
    // Class to test
    UserService service

    // Mock
    AggregatesReactiveRepository<UserAggregate, String> userDao

    // Real
    Clock clock
    DateTimeFormatter dtf
    BCryptPasswordEncoder encoder

    void setup() {
        userDao = Mock(UserAggregatesRepository)
        clock = Clock.fixed(Instant.now(), ZoneId.of(ZoneOffset.UTC.getId()))
        dtf = DateTimeFormatter.ISO_OFFSET_DATE_TIME.withZone(ZoneId.of(ZoneOffset.UTC.getId()))
        encoder = new BCryptPasswordEncoder()
        service = new UserService(userDao, clock, dtf, encoder)
    }

    def "find one - found"() {
        given:
        def id = "waifu"
        def user = new UserAggregate(id, OffsetDateTime.now(clock).format(dtf), OffsetDateTime.now(clock).format(dtf), id, "waifu@email.com", true, encoder.encode("password123"), "Lich", "Waifu Man", Role.USER)

        when:
        def result = service.findOne(id).block()

        then:
        1 * userDao.findById(id) >> Mono.just(user)

        result == user
    }

    def "fine one - not found"() {
        given:
        def id = "waifu"

        when:
        service.findOne(id).block()

        then:
        1 * userDao.findById(id) >> Mono.empty()

        thrown(AggregateNotFoundException)
    }

    def "batch find"() {
        given:
        def user1 = new UserAggregate("user1", OffsetDateTime.now(clock).format(dtf), OffsetDateTime.now(clock).format(dtf), "user1", "waifu1@email.com", true, encoder.encode("password123"), "Lich", "Waifu One", Role.ADMIN)
        def user2 = new UserAggregate("user2", OffsetDateTime.now(clock).format(dtf), OffsetDateTime.now(clock).format(dtf), "user2", "waifu2@email.com", true, encoder.encode("password123"), "Lich", "Waifu Two", Role.RAID_LEADER)
        def user3 = new UserAggregate("user3", OffsetDateTime.now(clock).format(dtf), OffsetDateTime.now(clock).format(dtf), "user3", "waifu3@email.com", true, encoder.encode("password123"), "Lich", "Waifu Three", Role.USER)

        def ids = List.of(user1.getId(), user2.getId(), user3.getId())

        when:
        def result = service.batchFind(ids).collectList().block()

        then:
        1 * userDao.query(Query.query(Criteria.where("id").in(ids))) >> Flux.fromIterable(List.of(user1, user2, user3))

        result.containsAll(List.of(user1, user2, user3))
    }

    def "register"() {
        given:
        def id = "waifu"

        UserAggregate captured = new UserAggregate()

        when:
        def result = service.register(new RegisterRequest(id)).block()

        then:
        1 * userDao.insert(_) >> { UserAggregate aggregate ->
            captured = aggregate
            return Mono.just(aggregate)
        }

        result != null
        result.id == id
        result.tempPassword != null
        encoder.matches(result.getTempPassword(), captured.getPassword())
    }

    def "reset password - user found"() {
        given:
        def id = "waifu"
        def user = new UserAggregate(id, OffsetDateTime.now(clock).format(dtf), OffsetDateTime.now(clock).format(dtf), id, "waifu@email.com", true, encoder.encode("password123"), "Lich", "Waifu Man", Role.USER)

        UserAggregate captured = new UserAggregate()

        when:
        def result = service.resetPassword(new RegisterRequest(id)).block()

        then:
        1 * userDao.findById(id) >> Mono.just(user)
        1 * userDao.upsert(_) >> { UserAggregate aggregate ->
            captured = aggregate
            return Mono.just(aggregate)
        }

        result != null
        result.id == id
        result.tempPassword != null
        encoder.matches(result.getTempPassword(), captured.getPassword())
    }

    def "reset password - user not found"() {
        given:
        def id = "waifu"

        when:
        service.resetPassword(new RegisterRequest(id)).block()

        then:
        1 * userDao.findById(id) >> Mono.empty()

        thrown(AggregateNotFoundException)
    }

    def "valid change details: #caseName"() {
        given:
        def id = "waifu"
        def user = new UserAggregate(id, OffsetDateTime.now(clock).format(dtf), OffsetDateTime.now(clock).format(dtf), id, "waifu@email.com", true, encoder.encode("password123"), "Lich", "Waifu Man", Role.USER)

        def request = new ChangeUserDetailsRequest(password, confirmPassword, server, inGameName, email, wantsEmails)

        when:
        def result = service.changeDetails(request, id).block()

        then:
        1 * userDao.findById(id) >> Mono.just(user)
        1 * userDao.upsert(_) >> { UserAggregate aggregate ->
            return Mono.just(aggregate)
        }

        result != null
        request.password != null ? encoder.matches(request.password, result.password) : result.password == user.password
        request.server != null ? result.server == request.server : result.server == user.server
        request.inGameName != null ? result.inGameName == request.inGameName : result.inGameName == user.inGameName
        request.email != null ? result.email == request.email : result.email == user.email
        request.wantsEmails != null ? result.wantsEmails == request.wantsEmails : result.wantsEmails == user.wantsEmails

        where:
        caseName                | password   | confirmPassword | server     | inGameName      | email                 | wantsEmails
        "new password"          | "newPass"  | "newPass"       | null       | null            | null                  | null
        "new server"            | null       | null            | "Cerberus" | null            | null                  | null
        "new in game name"      | null       | null            | null       | "Mooncake Cute" | null                  | null
        "new email"             | null       | null            | null       | null            | "changed@changed.com" | null
        "new email preference"  | null       | null            | null       | null            | null                  | false
        "new everything"        | "newPass1" | "newPass1"      | "Phoenix"  | "Cake Moon"     | "cake@moon.org"       | false
    }

    def "invalid change details: passwords don't match"() {
        given:
        def id = "waifu"
        def user = new UserAggregate(id, OffsetDateTime.now(clock).format(dtf), OffsetDateTime.now(clock).format(dtf), id, "waifu@email.com", true, encoder.encode("password123"), "Lich", "Waifu Man", Role.USER)

        def request = new ChangeUserDetailsRequest("asd123", "123asd", null, null, null, null)

        when:
        service.changeDetails(request, id).block()

        then:
        1 * userDao.findById(id) >> Mono.just(user)

        thrown(BadRequestException)
    }
}
