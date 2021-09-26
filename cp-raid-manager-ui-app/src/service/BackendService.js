import axios from 'axios';
import {
    makeUri,
    AUTH, RENEW,
    GET_USER, BATCH_GET_USERS, REGISTER_NEW_USER, RESET_PASSWORD, CHANGE_USER_DETAILS,
    GET_UPCOMING_RAIDS, GET_OLD_RAIDS, CREATE_RAID, GET_RAID,
    SIGNUP_FOR_RAID, SIGNOFF_FROM_RAID, LATEST_NOTIFICATIONS
} from './URIs';

// Auth & related
const auth = (payload) => {
    return axios.post(AUTH, payload).then(res => {
        return {
            user: res.data,
            token: res.headers.authorization
        }
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

const renew = (token) => {
    return axios.post(RENEW, undefined, { 
        headers: {
            "Authorization": token
        }
    }).then(res => {
        return {
            user: res.data,
            token: res.headers.authorization
        }
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

// Users
const getUser = (id) => {
    const uri = makeUri(GET_USER, [{name: "id", value: id}]);
    return axios.get(uri).then(res => {
        return res.data;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    });
}

const batchGetUsers = (ids) => {
    return axios.post(BATCH_GET_USERS, ids).then(res => {
        return res.data;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

const register = (payload) => {
    return axios.post(REGISTER_NEW_USER, payload).then(res => {
        return res.data;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

const resetPassword = (payload) => {
    return axios.post(RESET_PASSWORD, payload).then(res => {
        return res.data;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

const changeUserDetails = (payload) => {
    return axios.put(CHANGE_USER_DETAILS, payload).then(res => {
        return res.data;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    });
}

// Raids
const getUpcomingRaids = () => {
    return axios.get(GET_UPCOMING_RAIDS).then(res => {
        return res.data.documents;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

const getOldRaids = () => {
    return axios.get(GET_OLD_RAIDS).then(res => {
        return res.data.documents;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

const getRaid = (id) => {
    const uri = makeUri(GET_RAID, [{ name: "id", value: id }]);
    return axios.get(uri).then(res => {
        return res.data;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    });
}

const createRaid = (payload) => {
    return axios.post(CREATE_RAID, payload).then(res => {
        return res.data;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

const signupForRaid = (id, payload) => {
    const uri = makeUri(SIGNUP_FOR_RAID, [{ name: "id", value: id }]);
    return axios.put(uri, payload).then(res => {
        return res.data;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

const signoffFromRaid = (id) => {
    const uri = makeUri(SIGNOFF_FROM_RAID, [{ name: "id", value: id }]);
    return axios.put(uri, undefined).then(res => {
        return res.data;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

// Misc
const getLatestNotifications = () => {
    return axios.get(LATEST_NOTIFICATIONS).then(res => {
        return res.data;
    }).catch(err => {
        throw err?.response?.data?.msg ? Error(`${err.response.data.msg}!`) : Error(err.message);
    })
}

const service = {
    auth, renew,
    getUser, batchGetUsers, register, resetPassword, changeUserDetails,
    getUpcomingRaids, getOldRaids, getRaid, createRaid,
    signupForRaid, signoffFromRaid,
    getLatestNotifications
}

export default service;