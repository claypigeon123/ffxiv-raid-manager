package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.AggregatesReactiveRepository;
import com.cp.raidmanager.raidmanagerdomain.aggregate.RaidAggregate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.FindAndReplaceOptions;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
@RequiredArgsConstructor
public class RaidAggregatesRepository implements AggregatesReactiveRepository<RaidAggregate, String> {

    private final ReactiveMongoTemplate template;
    private final String raidCollectionName;

    @Override
    public Mono<RaidAggregate> findById(String s) {
        return template.findById(s, RaidAggregate.class, raidCollectionName);
    }

    @Override
    public Mono<RaidAggregate> findOne(Query query) {
        return template.query(RaidAggregate.class)
            .inCollection(raidCollectionName)
            .matching(query)
            .one();
    }

    @Override
    public Flux<RaidAggregate> query(Query query) {
        return template.query(RaidAggregate.class)
            .inCollection(raidCollectionName)
            .matching(query)
            .all();
    }

    @Override
    public Mono<RaidAggregate> insert(RaidAggregate aggregate) {
        return template.insert(RaidAggregate.class)
            .inCollection(raidCollectionName)
            .one(aggregate);
    }

    @Override
    public Mono<RaidAggregate> upsert(RaidAggregate aggregate) {
        return template.update(RaidAggregate.class)
            .inCollection(raidCollectionName)
            .matching(Query.query(where("id").is(aggregate.getId())))
            .replaceWith(aggregate)
            .withOptions(FindAndReplaceOptions.options().upsert().returnNew())
            .findAndReplace();
    }

    @Override
    public Mono<Void> deleteById(String s) {
        return template.remove(RaidAggregate.class)
            .inCollection(raidCollectionName)
            .matching(Query.query(where("id").is(s)))
            .all()
            .then();
    }
}
