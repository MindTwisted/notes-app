import {SET_NOTES} from "../constants/ActionTypes";

export default function notes(state = [], action) {
    switch (action.type) {
        case SET_NOTES:
            return [...action.notes];
        default:
            return state;
    }
}