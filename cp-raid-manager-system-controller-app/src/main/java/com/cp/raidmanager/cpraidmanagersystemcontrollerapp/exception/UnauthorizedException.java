package com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception;

import com.cp.raidmanager.cpraidmanagersystemcontrollerapp.exception.base.RaidManagerSystemControllerException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RaidManagerSystemControllerException {
    public UnauthorizedException() {
        super();
    }
}
