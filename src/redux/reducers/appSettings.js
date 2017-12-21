import {
    SET_SETTINGS,
    SET_NOTES_GRID_VIEW_MODE,
    SET_NOTES_LIST_VIEW_MODE,
    SET_LOADING_FINISHED
} from "../constants/ActionTypes";

const initialState = {
    isLoading: true
};

export default function appSettings(state = initialState, action) {
    switch (action.type) {
        case SET_SETTINGS:
            return {
                ...state,
                ...action.settings
            };
        case SET_LOADING_FINISHED:
            return {
                ...state,
                isLoading: false
            };
        case SET_NOTES_GRID_VIEW_MODE:
            return {
                ...state,
                noteSettings: {
                    viewMode: 'GRID'
                }
            };
        case SET_NOTES_LIST_VIEW_MODE:
            return {
                ...state,
                noteSettings: {
                    viewMode: 'LIST'
                }
            };
        default:
            return state;
    }
}