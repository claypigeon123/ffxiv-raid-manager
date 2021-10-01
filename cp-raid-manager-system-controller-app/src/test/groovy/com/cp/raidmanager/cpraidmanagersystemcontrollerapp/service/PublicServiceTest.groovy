package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.service

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.config.properties.JwtProperties
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.AggregatesReactiveRepository
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl.UserAggregatesRepository
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.UnauthorizedException
import com.cp.raidmanager.raidmanagerdomain.aggregate.UserAggregate
import com.cp.raidmanager.raidmanagerdomain.model.Role
import com.cp.raidmanager.raidmanagerdomain.request.AuthRequest
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.http.HttpStatus
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import reactor.core.publisher.Mono
import spock.lang.Specification

import javax.crypto.SecretKey
import java.time.Clock
import java.time.Instant
import java.time.OffsetDateTime
import java.time.ZoneId
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

import static org.springframework.data.mongodb.core.query.Criteria.*
import static org.springframework.data.mongodb.core.query.Query.*

class PublicServiceTest extends Specification {
    private static final String AUTH_HEADER = "Authorization"
    private static final String AUTH_PREFIX = "Bearer "
    private static final int EXPIRATION = 3600

    // Class to test
    PublicService service

    // Mock
    AggregatesReactiveRepository<UserAggregate, String> userDao

    // Real
    BCryptPasswordEncoder encoder
    Clock clock
    SecretKey key
    DateTimeFormatter dtf

    void setup() {
        userDao = Mock(UserAggregatesRepository)
        encoder = new BCryptPasswordEncoder()
        clock = Clock.fixed(Instant.now(), ZoneId.of(ZoneOffset.UTC.getId()))
        dtf = DateTimeFormatter.ISO_OFFSET_DATE_TIME.withZone(ZoneId.of(ZoneOffset.UTC.getId()))
        key = Keys.secretKeyFor(SignatureAlgorithm.HS512)
        def jwtProps = new JwtProperties(AUTH_HEADER, AUTH_PREFIX, EXPIRATION, "XsecretXsecretXsecretX")
        service = new PublicService(userDao, key, jwtProps, clock, encoder)
    }

    def "auth - user found, correct password"() {
        given:
        def id = "waifu"
        def passwordPlain = "password123"
        def user = new UserAggregate(id, OffsetDateTime.now(clock).format(dtf), OffsetDateTime.now(clock).format(dtf), id, "waifu@email.com", true, encoder.encode(passwordPlain), "Lich", "Waifu Man", Role.USER)

        def authRequest = new AuthRequest(id, passwordPlain)

        when:
        def result = service.auth(authRequest).block()

        then:
        1 * userDao.findOne(query(where("username").is(id))) >> Mono.just(user)

        result.statusCode == HttpStatus.OK
        result.headers.containsKey(AUTH_HEADER)

        def claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(result.headers.toSingleValueMap().get(AUTH_HEADER).split(" ")[1]).getBody()
        claims.getSubject() == id
        claims.get("role") == Role.USER.toString()
        claims.getIssuedAt().toInstant().getEpochSecond() == OffsetDateTime.now(clock).toInstant().getEpochSecond()
        claims.getExpiration().toInstant().getEpochSecond() == OffsetDateTime.now(clock).toInstant().getEpochSecond() + EXPIRATION
    }

    def "auth - user found, incorrect password"() {
        given:
        def id = "waifu"
        def passwordPlain = "password123"
        def user = new UserAggregate(id, OffsetDateTime.now(clock).format(dtf), OffsetDateTime.now(clock).format(dtf), id, "waifu@email.com", true, encoder.encode(passwordPlain), "Lich", "Waifu Man", Role.USER)

        def authRequest = new AuthRequest(id, "wrongPassword")

        when:
        service.auth(authRequest).block()

        then:
        1 * userDao.findOne(query(where("username").is(id))) >> Mono.just(user)

        thrown(UnauthorizedException)
    }

    def "auth - user not found"() {
        given:
        def id = "waifu"
        def authRequest = new AuthRequest(id, "somePassword")

        when:
        service.auth(authRequest).block()

        then:
        1 * userDao.findOne(query(where("username").is(id))) >> Mono.empty()

        thrown(UnauthorizedException)
    }

    def "renew - user found"() {
        given:
        def id = "waifu"
        def passwordPlain = "password123"
        def user = new UserAggregate(id, OffsetDateTime.now(clock).format(dtf), OffsetDateTime.now(clock).format(dtf), id, "waifu@email.com", true, encoder.encode(passwordPlain), "Lich", "Waifu Man", Role.USER)

        when:
        def result = service.renew(id).block()

        then:
        1 * userDao.findOne(query(where("username").is(id))) >> Mono.just(user)

        result.statusCode == HttpStatus.OK
        result.headers.containsKey(AUTH_HEADER)

        def claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(result.headers.toSingleValueMap().get(AUTH_HEADER).split(" ")[1]).getBody()
        claims.getSubject() == id
        claims.get("role") == Role.USER.toString()
        claims.getIssuedAt().toInstant().getEpochSecond() == OffsetDateTime.now(clock).toInstant().getEpochSecond()
        claims.getExpiration().toInstant().getEpochSecond() == OffsetDateTime.now(clock).toInstant().getEpochSecond() + EXPIRATION
    }

    def "renew - user not found"() {
        given:
        def id = "waifu"

        when:
        service.renew(id).block()

        then:
        1 * userDao.findOne(query(where("username").is(id))) >> Mono.empty()

        thrown(UnauthorizedException)
    }
}
