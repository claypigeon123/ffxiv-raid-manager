package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.dao;

import org.springframework.data.couchbase.core.query.Query;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface AggregatesReactiveRepository<T, ID> {
    Mono<T> findById(ID id);

    Mono<T> findOne(Query query);

    Flux<T> query(Query query);

    Mono<T> insert(T aggregate);

    Mono<T> upsert(T aggregate);

    Mono<Void> deleteById(ID id);
}
