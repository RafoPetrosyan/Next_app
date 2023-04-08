import {configureStore} from "@reduxjs/toolkit";
import users from "./users";

const store = configureStore({
    reducer: {
        users,
    },
});

export default store;
