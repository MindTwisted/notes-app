import firebase from '../../firebase';

import {setSuccessNotification, deleteNotification} from './notification';

import * as types from '../constants/ActionTypes';

export function setCategories(categories) {
    return {
        type: types.SET_CATEGORIES,
        categories
    }
}

export function addCategory(category) {
    return {
        type: types.ADD_CATEGORY,
        category
    }
}

export function deleteCategory(id) {
    return {
        type: types.DELETE_CATEGORY,
        id
    }
}

export function updateCategory(id, title) {
    const updatedCategory = {
        id,
        title
    };

    return {
        type: types.UPDATE_CATEGORY,
        updatedCategory
    }
}

export function addCategoryRequest(dispatch) {
    return function (title) {
        return new Promise((resolve) => {
            const userId = firebase.auth().currentUser.uid;
            const newCategoryRef = firebase.database().ref(`${userId}/categories`).push();
            const newCategory = {
                id: newCategoryRef.key,
                title
            };

            newCategoryRef.set({
                title: newCategory.title
            });

            newCategoryRef.once('child_added', () => {
                dispatch(addCategory(newCategory));
                dispatch(deleteNotification());
                dispatch(setSuccessNotification(`Category with title "${newCategory.title}"
                     was successfully added`));
                resolve();
            });
        })
    }
}

export function deleteCategoryRequest(dispatch) {
    return function (id, title) {
        return new Promise((resolve) => {
            const userId = firebase.auth().currentUser.uid;
            const deletingCategoryRef = firebase.database().ref(`${userId}/categories/${id}`);

            deletingCategoryRef.remove();
            deletingCategoryRef.once('value', () => {
                dispatch(deleteCategory(id));
                dispatch(deleteNotification());
                dispatch(setSuccessNotification(`Category with title "${title}"
                 was successfully deleted`));
                resolve();
            });
        })
    }
}

export function updateCategoryRequest(dispatch) {
    return function (id, title) {
        return new Promise((resolve) => {
            const userId = firebase.auth().currentUser.uid;
            const updatingCategoryRef = firebase.database().ref(`${userId}/categories/${id}`);

            updatingCategoryRef.set({
                title
            });
            updatingCategoryRef.once('value', () => {
                dispatch(updateCategory(id, title));
                dispatch(deleteNotification());
                dispatch(setSuccessNotification(`Category was successfully updated. 
                New title is "${title}"`));
                resolve();
            });
        })
    }
}