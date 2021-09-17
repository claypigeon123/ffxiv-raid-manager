package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.base;

public class RaidManagerSystemControllerException extends RuntimeException {
    public RaidManagerSystemControllerException() {
        super("Unknown error encountered");
    }

    public RaidManagerSystemControllerException(String message) {
        super(message);
    }
}
