import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {HYDRATE} from 'next-redux-wrapper';
import users from "./users";

const combinedReducers = combineReducers({
    users,
})

const rootReducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        }
    }
    return combinedReducers(state, action)
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;
