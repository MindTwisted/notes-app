import firebase from '../../firebase';
import {deleteNotification, setSuccessNotification} from './notification';

import * as types from '../constants/ActionTypes';

export function setNotes(notes) {
    return {
        type: types.SET_NOTES,
        notes
    }
}

export function deleteNote(id) {
    return {
        type: types.DELETE_NOTE,
        id
    }
}

export function deleteNoteRequest(dispatch) {
    return function (id, title) {
        return new Promise((resolve) => {
            const userId = firebase.auth().currentUser.uid;
            const deletingCategoryRef = firebase.database().ref(`${userId}/notes/${id}`);

            deletingCategoryRef.remove();
            deletingCategoryRef.once('value', () => {
                dispatch(deleteNote(id));
                dispatch(deleteNotification());
                dispatch(setSuccessNotification(`Note with title "${title}"
                 was successfully deleted`));
                resolve();
            });
        })
    }
}