package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.AggregatesReactiveRepository;
import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.domain.aggregate.RaidAggregate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.couchbase.core.ReactiveCouchbaseTemplate;
import org.springframework.data.couchbase.core.query.Query;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class RaidAggregatesRepository implements AggregatesReactiveRepository<RaidAggregate, String> {
    private final ReactiveCouchbaseTemplate template;

    @Override
    public Mono<RaidAggregate> findById(String id) {
        return template.findById(RaidAggregate.class)
            .one(id);
    }

    @Override
    public Mono<RaidAggregate> findOne(Query query) {
        return template.findByQuery(RaidAggregate.class)
            .matching(query)
            .one();
    }

    @Override
    public Flux<RaidAggregate> query(Query query) {
        return template.findByQuery(RaidAggregate.class)
            .matching(query)
            .all();
    }

    @Override
    public Mono<RaidAggregate> insert(RaidAggregate aggregate) {
        return template.insertById(RaidAggregate.class)
            .one(aggregate);
    }

    @Override
    public Mono<RaidAggregate> upsert(RaidAggregate aggregate) {
        return template.upsertById(RaidAggregate.class)
            .one(aggregate);
    }

    @Override
    public Mono<Void> deleteById(String id) {
        return template.removeById()
            .one(id)
            .then();
    }
}
