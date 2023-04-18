import {configureStore} from "@reduxjs/toolkit";
import users from "./users";
import cities from "./cities";
import category from "./category";
import modal from "./modal";

const store = configureStore({
    reducer: {
        users,
        cities,
        category,
        modal,
    },
});

export default store;
