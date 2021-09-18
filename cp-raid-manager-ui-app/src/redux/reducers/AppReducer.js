import axios from "axios";
import {
    START_LOADING, END_LOADING,
    GENERIC_ERROR, CLEAR_ERRORS,
    LOGIN, CHECK_SESSION, LOGOUT, USER_DETAILS_CHANGED
} from "../actions/ActionsTypes";

const initialState = {
    user: undefined,
    token: undefined,
    loggedIn: false,
    checkedStorage: false,
    
    loading: false,
    genericError: undefined
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: true
            }
        case END_LOADING:
            return {
                ...state,
                loading: false
            }
        case GENERIC_ERROR:
            return {
                ...state,
                genericError: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                genericError: undefined
            }
        case LOGIN:
            const token = action.payload.token;
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem("token", token)
            return {
                ...state,
                user: action.payload.user,
                token: token,
                loggedIn: true,
                checkedStorage: true
            }
        case CHECK_SESSION:
            return {
                ...state,
                checkedStorage: true
            }
        case LOGOUT:
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem("token");
            return {
                ...state,
                user: undefined,
                token: undefined,
                loggedIn: false
            }
        case USER_DETAILS_CHANGED:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}