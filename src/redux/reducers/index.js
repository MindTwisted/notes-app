import {combineReducers} from 'redux';
import user from './user';
import categories from './categories';
import notes from './notes';
import notification from './notification';
import auth from './auth';
import appSettings from './appSettings';

import {SET_LOGGED_OUT} from '../constants/ActionTypes';

const appReducer = combineReducers({
    user,
    categories,
    notes,
    notification,
    auth,
    appSettings
});

const rootReducer = (state, action) => {
    if (action.type === SET_LOGGED_OUT) {
        state = undefined;
    }

    return appReducer(state, action)
};

export default rootReducer;