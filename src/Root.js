import React from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import App from './App';
import users from './middlewares/users'
//import { CookiesProvider } from 'react-cookie

var store = createStore(rootReducer, applyMiddleware(thunk, users))

export default function Root() {
    return (
        <Provider store = {store} >
            <App/>
        </Provider>
    );
}