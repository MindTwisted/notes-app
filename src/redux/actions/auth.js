import firebaseNPM from 'firebase';
import firebase from '../../firebase';

import {setErrorNotification, setSuccessNotification} from './notification';
import {setUserName} from './user';

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
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = firebase.auth().currentUser;
                const userId = user.uid;
                let newUserName = 'Anonymous';

                user.updateProfile({
                    displayName: newUserName
                }).then(() => {
                    dispatch(setUserName(newUserName));
                });

                firebase.database().ref(`${userId}/appSettings/noteSettings`).set({
                    viewMode: 'LIST'
                });
            })
            .catch(function (error) {
                const errorMessage = error.message;
                dispatch(setErrorNotification(errorMessage));
            });
    }
}

export function signInRequest(dispatch) {
    return function (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            const errorMessage = error.message;
            dispatch(setErrorNotification(errorMessage));
        });
    }
}

export function reAuthenticateRequest(dispatch) {
    return function (password) {
        return new Promise((resolve, reject) => {
            const user = firebase.auth().currentUser;

            const credential = firebaseNPM.auth.EmailAuthProvider.credential(
                user.email,
                password
            );

            user.reauthenticateWithCredential(credential)
                .then(() => {
                    dispatch(setSuccessNotification('You was successfully re-authenticated'));
                    resolve();
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    dispatch(setErrorNotification(errorMessage));
                    reject(errorMessage);
                });
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

export function deleteAccountRequest(dispatch) {
    return function () {
        const user = firebase.auth().currentUser;
        const userId = user.uid;

        user.delete()
            .then(() => {
                const userDatabaseRef = firebase.database().ref(`${userId}`);

                userDatabaseRef.remove();
                userDatabaseRef.once('value', () => {
                    dispatch(setLoggedOut());
                });
            })
            .catch((error) => {
                dispatch(setErrorNotification(error.message));
            });
    }
}