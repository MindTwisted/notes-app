import {SET_SUCCESS_NOTIFICATION, SET_ERROR_NOTIFICATION, DELETE_NOTIFICATION} from "../constants/ActionTypes";

export default function notification(state = {}, action) {
    switch (action.type) {
        case SET_SUCCESS_NOTIFICATION:
            return Object.assign({}, {
                type: 'SUCCESS',
                message: action.message
            });
        case SET_ERROR_NOTIFICATION:
            return Object.assign({}, {
                type: 'ERROR',
                message: action.message
            });
        case DELETE_NOTIFICATION:
            return {};
        default:
            return state;
    }
}