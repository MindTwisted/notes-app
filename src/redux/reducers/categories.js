import {ADD_CATEGORY, SET_CATEGORIES, DELETE_CATEGORY, UPDATE_CATEGORY} from "../constants/ActionTypes";

export default function categories(state = [], action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return [...action.categories];
        case ADD_CATEGORY:
            return [...state, action.category];
        case DELETE_CATEGORY:
            const filteredCategories = state.filter((item) => {
                return item.id !== action.id
            });
            return [...filteredCategories];
        case UPDATE_CATEGORY:
            const id = action.updatedCategory.id;
            const title = action.updatedCategory.title;

            const updatedCategories = state.map((item) => {
                if (item.id === id) {
                    item.title = title;
                }
                return item;
            });
            return [...updatedCategories];
        default:
            return state;
    }
}