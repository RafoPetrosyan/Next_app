import {configureStore} from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper';
import users from "./users";

export const store = configureStore({
    reducer: {
        users,
    },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
