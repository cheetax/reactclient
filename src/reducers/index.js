import { combineReducers } from "redux";
import users from "./users";
import login from './login'
import roles from './roles'
import contentView from './contentView';

const rootReducer = combineReducers({
    users: users,
    login: login,
    roles: roles,
    contentView: contentView,
});

export default rootReducer;