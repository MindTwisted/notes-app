import firebase from '../../firebase';

import {setErrorNotification} from './notification';

import * as types from '../constants/ActionTypes';

export function setLoggedOut() {
    return {
        type: types.SET_LOGGED_OUT
    }
}

export function setLoggedIn() {
    return {
        type: types.SET_LOGGED_IN
    }
}

export function registerUserRequest(dispatch) {
    return function (email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            const errorMessage = error.message;
            dispatch(setErrorNotification(errorMessage));
        });
    }
}

export function signInRequest(dispatch) {
    return function (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            const errorMessage = error.message;
            dispatch(setErrorNotification(errorMessage));
        });
    }
}

export function signOutRequest(dispatch) {
    return function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }
}