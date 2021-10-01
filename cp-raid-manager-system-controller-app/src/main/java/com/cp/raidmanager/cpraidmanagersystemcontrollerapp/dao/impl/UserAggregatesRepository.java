package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.impl;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao.AggregatesReactiveRepository;
import com.cp.raidmanager.raidmanagerdomain.aggregate.UserAggregate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.FindAndReplaceOptions;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import static org.springframework.data.mongodb.core.query.Criteria.*;

@Repository
@RequiredArgsConstructor
public class UserAggregatesRepository implements AggregatesReactiveRepository<UserAggregate, String> {

    private final ReactiveMongoTemplate template;
    private final String userCollectionName;

    @Override
    public Mono<UserAggregate> findById(String s) {
        return template.findById(s, UserAggregate.class, userCollectionName);
    }

    @Override
    public Mono<UserAggregate> findOne(Query query) {
        return template.query(UserAggregate.class)
            .inCollection(userCollectionName)
            .matching(query)
            .one();
    }

    @Override
    public Flux<UserAggregate> query(Query query) {
        return template.query(UserAggregate.class)
            .inCollection(userCollectionName)
            .matching(query)
            .all();
    }

    @Override
    public Mono<UserAggregate> insert(UserAggregate aggregate) {
        return template.insert(UserAggregate.class)
            .inCollection(userCollectionName)
            .one(aggregate);
    }

    @Override
    public Mono<UserAggregate> upsert(UserAggregate aggregate) {
        return template.update(UserAggregate.class)
            .inCollection(userCollectionName)
            .matching(Query.query(where("id").is(aggregate.getId())))
            .replaceWith(aggregate)
            .withOptions(FindAndReplaceOptions.options().upsert().returnNew())
            .findAndReplace();
    }

    @Override
    public Mono<Void> deleteById(String s) {
        return template.remove(UserAggregate.class)
            .inCollection(userCollectionName)
            .matching(Query.query(where("_id").is(s)))
            .all()
            .then();
    }
}
