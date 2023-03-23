import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import users from "./users";

const combinedReducer = combineReducers({
    users,
});

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {...state, ...action.payload};
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer,
});

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
