import {SET_LOGGED_IN, SET_LOGGED_OUT} from "../constants/ActionTypes";

const initialState = {
    isLoggedIn: false
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case SET_LOGGED_IN:
            return {
                isLoggedIn: true
            };
        case SET_LOGGED_OUT:
            return {
                isLoggedIn: false
            };
        default:
            return state;
    }
}