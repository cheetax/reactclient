import { combineReducers } from "redux";
import users from "./users";
import login from './login'

const rootReducer = combineReducers({
    users: users,
    login: login,
});

export default rootReducer;