import axios from 'axios';
import {
    makeUri,
    AUTH, RENEW,
    CHANGE_USER_DETAILS
} from './URIs';

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

const changeUserDetails = (payload) => {
    return axios.put(CHANGE_USER_DETAILS, payload).then(res => {
        return res.data;
    }).catch(err => {
        throw Error(err.message);
    });
}

const service = {
    auth, renew,
    changeUserDetails
}

export default service;