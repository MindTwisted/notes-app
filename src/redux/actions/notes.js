import * as types from '../constants/ActionTypes';

export function setNotes(notes) {
    return {
        type: types.SET_NOTES,
        notes
    }
}
