import firebase from '../../firebase';

import * as types from '../constants/ActionTypes';

export function setSettings(settings) {
    return {
        type: types.SET_SETTINGS,
        settings
    }
}

export function setLoadingFinished() {
    return {
        type: types.SET_LOADING_FINISHED
    }
}

export function setNotesGridViewMode() {
    return {
        type: types.SET_NOTES_GRID_VIEW_MODE
    }
}

export function setNotesListViewMode() {
    return {
        type: types.SET_NOTES_LIST_VIEW_MODE
    }
}

export function notesGridViewRequest(dispatch) {
    return function () {
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        const noteSettingsRef = firebase.database().ref(`${userId}/appSettings/noteSettings`);

        noteSettingsRef.set({
            viewMode: 'GRID'
        });

        noteSettingsRef.once('value', function () {
            dispatch(setNotesGridViewMode());
        });
    }
}

export function notesListViewRequest(dispatch) {
    return function () {
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        const noteSettingsRef = firebase.database().ref(`${userId}/appSettings/noteSettings`);

        noteSettingsRef.set({
            viewMode: 'LIST'
        });

        noteSettingsRef.once('value', function () {
            dispatch(setNotesListViewMode());
        });
    }
}
