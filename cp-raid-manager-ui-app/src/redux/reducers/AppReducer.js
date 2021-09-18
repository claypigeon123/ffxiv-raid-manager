import { LOGIN, LOGOUT } from "../actions/ActionsTypes";

const initialState = {
    user: null,
    loggedIn: false,
    isLoadingUser: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return state;
        case LOGOUT:
            return state;
        default:
            return state;
    }
}