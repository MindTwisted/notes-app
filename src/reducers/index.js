import {combineReducers} from 'redux';
import user from './user';
import categories from './categories';
import notification from './notification';

const rootReducer = combineReducers({
    user,
    categories,
    notification
});

export default rootReducer;