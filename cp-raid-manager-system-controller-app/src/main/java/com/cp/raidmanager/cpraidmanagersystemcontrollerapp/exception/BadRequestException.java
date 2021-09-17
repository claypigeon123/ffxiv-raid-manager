package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.base.RaidManagerSystemControllerException;

public class BadRequestException extends RaidManagerSystemControllerException {
    public BadRequestException() {
        super("Invalid request body received");
    }

    public BadRequestException(String s) {
        super(s);
    }
}
