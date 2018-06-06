import { combineReducers } from "redux";
import users from "./users";
import login from './login'
import roles from './roles'

const rootReducer = combineReducers({
    users: users,
    login: login,
    roles: roles,
});

export default rootReducer;