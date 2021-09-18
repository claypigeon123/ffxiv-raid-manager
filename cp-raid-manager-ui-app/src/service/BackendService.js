import axios from 'axios';
import {
    //makeUri,
    AUTH, RENEW,
    CHANGE_USER_DETAILS,
    GET_UPCOMING_RAIDS,
    GET_OLD_RAIDS
} from './URIs';

// Auth & related
const auth = (payload) => {
    return axios.post(AUTH, payload).then(res => {
        return {
            user: res.data,
            token: res.headers.authorization
        }
    }).catch(err => {
        throw Error(`${err.response.data.msg}!`);
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
        throw Error(`${err.response.data.msg}!`);
    })
}

// Users
const changeUserDetails = (payload) => {
    return axios.put(CHANGE_USER_DETAILS, payload).then(res => {
        return res.data;
    }).catch(err => {
        throw Error(err.message);
    });
}

// Raids
const getUpcomingRaids = () => {
    return axios.get(GET_UPCOMING_RAIDS).then(res => {
        return res.data.documents;
    }).catch(err => {
        throw Error(err.message);
    })
}

const getOldRaids = () => {
    return axios.get(GET_OLD_RAIDS).then(res => {
        return res.data.documents;
    }).catch(err => {
        throw Error(err.message);
    })
}

const service = {
    auth, renew,
    changeUserDetails,
    getUpcomingRaids, getOldRaids
}

export default service;