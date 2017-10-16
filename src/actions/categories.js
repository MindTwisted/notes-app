import axios from 'axios';

import * as types from '../constants/ActionTypes';
import {API_CATEGORIES_URL} from "../constants/API";

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

export function fetchCategories() {
    return function (dispatch) {
        return axios.get(API_CATEGORIES_URL)
            .then(function (response) {
                dispatch(setCategories(response.data));
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

export function addCategoryRequest(dispatch) {
    return function (title) {
        return new Promise((resolve, reject) => {
            return axios.post(API_CATEGORIES_URL, {
                title
            })
                .then(function (response) {
                    dispatch(addCategory(response.data));
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                })
        })
    }
}

export function deleteCategoryRequest(dispatch) {
    return function (id) {
        return new Promise((resolve, reject) => {
            return axios.delete(`${API_CATEGORIES_URL}/${id}`)
                .then(function (response) {
                    dispatch(deleteCategory(id));
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                })
        })
    }
}

export function updateCategoryRequest(dispatch) {
    return function (id, title) {
        return new Promise((resolve, reject) => {
            return axios.patch(`${API_CATEGORIES_URL}/${id}`, {
                title
            })
                .then(function (response) {
                    dispatch(updateCategory(id, title));
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                })
        })
    }
}