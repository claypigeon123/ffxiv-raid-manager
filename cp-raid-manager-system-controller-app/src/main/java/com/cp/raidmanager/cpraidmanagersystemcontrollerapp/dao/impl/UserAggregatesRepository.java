package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.AggregatesReactiveRepository;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.UserAggregate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.couchbase.core.ReactiveCouchbaseTemplate;
import org.springframework.data.couchbase.core.query.Query;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class UserAggregatesRepository implements AggregatesReactiveRepository<UserAggregate, String> {
    private final ReactiveCouchbaseTemplate template;

    @Override
    public Mono<UserAggregate> findById(String id) {
        return template.findById(UserAggregate.class)
            .one(id);
    }

    @Override
    public Mono<UserAggregate> findOne(Query query) {
        return template.findByQuery(UserAggregate.class)
            .matching(query)
            .one();
    }

    @Override
    public Flux<UserAggregate> query(Query query) {
        return template.findByQuery(UserAggregate.class)
            .matching(query)
            .all();
    }

    @Override
    public Mono<UserAggregate> insert(UserAggregate aggregate) {
        return template.insertById(UserAggregate.class)
            .one(aggregate);
    }

    @Override
    public Mono<UserAggregate> upsert(UserAggregate aggregate) {
        return template.upsertById(UserAggregate.class)
            .one(aggregate);
    }

    @Override
    public Mono<Void> deleteById(String id) {
        return template.removeById()
            .one(id)
            .then();
    }
}
