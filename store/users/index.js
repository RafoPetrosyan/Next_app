import Router from "next/router";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {userSignIn, userSignUp, fetchProducts} from "./operations";
import {setAuthorizationHeader} from "../../utils/helpers";
import Cookies from "../../utils/cookies";

const initialState = {
    currentUser: {},
    isUserAuthorized: false,
    loader: false,
    products: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserAuthorized: (state, {payload}) => {
            if (payload) {
                state.isUserAuthorized = true;
                return;
            }
            state.isUserAuthorized = false;
        },
        setCurrentUser: (state, {payload}) => {
           state.currentUser = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, {payload}) => {
                state.products = payload;
            })
            .addMatcher(
                isAnyOf(userSignIn.pending, userSignUp.pending), (state) => {
                    state.loader = true;
                })
            .addMatcher(isAnyOf(userSignIn.fulfilled, userSignUp.fulfilled),
                (state, {payload}) => {
                    state.loader = false;
                    if (!payload) return;

                    setAuthorizationHeader(payload.data.meta?.access);
                    state.accessToken = payload.data.meta?.access;

                    if (payload.rememberMe) {
                        Cookies.setCookie(null, 'currentUser', payload.data.data.attributes, {maxAge: 365 * 24 * 60 * 60});
                        Cookies.setCookie(null, 'accessToken', payload.data.meta?.access, {maxAge: 365 * 24 * 60 * 60});
                    } else {
                        Cookies.setCookie(null, 'currentUser', payload.data.data.attributes);
                        Cookies.setCookie(null, 'accessToken', payload.data.meta?.access);
                    }
                    state.currentUser = payload.data;
                    state.isUserAuthorized = true;
                    Router.push('/profile')
                })
    }
});

export const {setUserAuthorized, setCurrentUser} = usersSlice.actions;
export default usersSlice.reducer;
