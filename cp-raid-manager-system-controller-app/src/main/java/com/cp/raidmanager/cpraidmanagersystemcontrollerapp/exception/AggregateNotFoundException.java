package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.base.RaidManagerSystemControllerException;

public class AggregateNotFoundException extends RaidManagerSystemControllerException {
    public AggregateNotFoundException() {
        super("Aggregate not found");
    }
}
