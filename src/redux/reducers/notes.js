import {SET_NOTES, DELETE_NOTE} from "../constants/ActionTypes";

export default function notes(state = [], action) {
    switch (action.type) {
        case SET_NOTES:
            return [...action.notes];
        case DELETE_NOTE:
            const filteredNotes = state.filter((item) => {
                return item.id !== action.id
            });
            return [...filteredNotes];
        default:
            return state;
    }
}