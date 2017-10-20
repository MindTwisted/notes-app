import * as types from '../constants/ActionTypes';

export function setSuccessNotification(message) {
    return {
        type: types.SET_SUCCESS_NOTIFICATION,
        message
    }
}

export function setErrorNotification(message) {
    return {
        type: types.SET_ERROR_NOTIFICATION,
        message
    }
}

export function deleteNotification() {
    return {
        type: types.DELETE_NOTIFICATION
    }
}

export function addSuccessNotification(dispatch) {
    return function (message) {
        dispatch(setSuccessNotification(message));
    }
}

export function addErrorNotification(dispatch) {
    return function (message) {
        dispatch(setErrorNotification(message));
    }
}

export function removeNotification(dispatch) {
    return function () {
        dispatch(deleteNotification());
    }
}