import service from "../../service/BackendService";
import {
    START_LOADING, END_LOADING,
    GENERIC_ERROR, CLEAR_ERRORS,
    LOGIN, CHECK_SESSION, LOGOUT, USER_DETAILS_CHANGED
} from "./ActionsTypes";

const GENERIC_ERROR_MSG = "An unexpected error was encountered";

export const startLoadingAction = () => (
    { type: START_LOADING }
)

export const endLoadingAction = () => (
    { type: END_LOADING }
)

export const genericErrorAction = (e) => (
    { type: GENERIC_ERROR, payload: e }
)

export const clearErrorsAction = () => (
    { type: CLEAR_ERRORS }
)

export const loginAction = (username, password) => {
    return dispatch => service.auth({ username, password }).then(data => {
        dispatch({ type: LOGIN, payload: data })
    }).catch(e => {
        dispatch(genericErrorAction(e.message || GENERIC_ERROR_MSG))
    }).finally(() => {
        dispatch(endLoadingAction())
    })
}

export const renewAction = (token) => {
    return dispatch => service.renew(token).then(data => {
        dispatch({ type: LOGIN, payload: data })
    }).catch(e => {
        dispatch(checkSessionAction());
    }).finally(() => {
        dispatch(endLoadingAction());
    })
}

export const checkSessionAction = () => (
    { type: CHECK_SESSION }
)

export const logoutAction = () => (
    { type: LOGOUT }
)

export const userDetailsChangedAction = (payload) => (
    { type: USER_DETAILS_CHANGED, payload: payload }
)