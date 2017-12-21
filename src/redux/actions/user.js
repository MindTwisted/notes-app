import firebase from '../../firebase';

import {setErrorNotification, setSuccessNotification, deleteNotification} from './notification';

import * as types from '../constants/ActionTypes';

export function setUser(user) {
    return {
        type: types.SET_USER,
        user
    }
}

export function setUserEmail(email) {
    return {
        type: types.SET_USER_EMAIL,
        email
    }
}

export function setUserName(name) {
    return {
        type: types.SET_USER_NAME,
        name
    }
}

export function fetchUser() {
    return function (dispatch) {
        const user = firebase.auth().currentUser;

        if (user != null) {
            dispatch(setUser({
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL
            }));
        } else {
            dispatch(deleteNotification());
            dispatch(setErrorNotification('There are some error with authentication'));
        }

    }
}

export function updateUserEmail(dispatch) {
    return function (email) {
        return new Promise(function (resolve, reject) {
            const user = firebase.auth().currentUser;

            user.updateEmail(email)
                .then(function () {
                    dispatch(deleteNotification());
                    dispatch(setSuccessNotification("Email was successfully updated"));
                    dispatch(setUserEmail(email));
                    resolve();
                })
                .catch(function (error) {
                    dispatch(deleteNotification());
                    dispatch(setErrorNotification(error.message));
                    reject(error.message);
                })
        })
    }
}

export function updateUserPassword(dispatch) {
    return function (password) {
        return new Promise(function (resolve, reject) {
            const user = firebase.auth().currentUser;

            user.updatePassword(password)
                .then(function () {
                    dispatch(deleteNotification());
                    dispatch(setSuccessNotification("Password was successfully updated"));
                    resolve();
                })
                .catch(function (error) {
                    dispatch(deleteNotification());
                    dispatch(setErrorNotification(error.message));
                    reject(error.message);
                })
        })
    }
}

export function updateUserName(dispatch) {
    return function (name) {
        return new Promise(function (resolve, reject) {
            const user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: name
            })
                .then(function () {
                    dispatch(deleteNotification());
                    dispatch(setSuccessNotification("Name was successfully updated"));
                    dispatch(setUserName(name));
                    resolve();
                })
                .catch(function (error) {
                    dispatch(deleteNotification());
                    dispatch(setErrorNotification(error.message));
                    reject(error.message);
                })
        })
    }
}