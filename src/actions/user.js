import axios from 'axios';

import * as types from '../constants/ActionTypes';
import {API_USER_URL, LOGOUT_URL} from "../constants/API";

export function setUser(user) {
    return {
        type: types.SET_USER,
        user
    }
}

export function fetchUser() {
    return function (dispatch) {
        return axios.get(API_USER_URL)
            .then(function (response) {
                dispatch(setUser(response.data));
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

export function updateUser(dispatch) {
    return function (name, email, photo) {
        let formData = new FormData();
        formData.append('photo', photo);
        formData.append('name', name);
        formData.append('email', email);

        return new Promise((resolve, reject) => {
            return axios.patch(API_USER_URL, formData)
                .then(function (response) {
                    dispatch(setUser(response.data));
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                })
        })
    }
}

export function logout() {
    return function () {
        return axios.post(LOGOUT_URL)
            .then(function (response) {
                alert(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}