import {SET_USER, SET_USER_EMAIL, SET_USER_NAME} from "../constants/ActionTypes";

export default function user(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, action.user);
        case SET_USER_EMAIL:
            return Object.assign({}, {
                ...state,
                email: action.email
            });
        case SET_USER_NAME:
            return Object.assign({}, {
                ...state,
                name: action.name
            });
        default:
            return state;
    }
}