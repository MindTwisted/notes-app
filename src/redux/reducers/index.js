import {combineReducers} from 'redux';
import user from './user';
import categories from './categories';
import notification from './notification';
import auth from './auth';
import {SET_LOGGED_OUT} from '../constants/ActionTypes';

const appReducer = combineReducers({
    user,
    categories,
    notification,
    auth
});

const rootReducer = (state, action) => {
    if (action.type === SET_LOGGED_OUT) {
        state = undefined;
    }

    return appReducer(state, action)
};

export default rootReducer;