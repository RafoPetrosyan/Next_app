import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {isEmpty} from "lodash";
import {
    userLogAuth,
    userSignIn,
    userSignUp,
    fetchCurrentUser,
    fetchProducts,
} from "./operations";
import Account from "../../utils/Account";

const initialState = {
    currentUser: Account.getAccount(),
    isUserAuthorized: Account.getAccessToken() && !isEmpty(Account.getAccount()),
    loader: false,
    products: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        changUserLogged: (state, {payload}) => {
            if (payload) {
                state.isUserAuthorized = true;
                return;
            }
            state.isUserAuthorized = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogAuth.fulfilled, (state) => {
                state.currentUser = {};
                state.isUserAuthorized = false;
            })
            .addCase(fetchProducts.fulfilled, (state, {payload}) => {
                state.products = payload;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.currentUser = action.payload.user
                Account.setAccount(action.payload.user);
            })
            .addMatcher(
                isAnyOf(userSignIn.pending, userSignUp.pending), (state) => {
                    state.loader = true;
                })
            .addMatcher(isAnyOf(userSignIn.fulfilled, userSignUp.fulfilled),
                (state, {payload}) => {
                    state.loader = false;
                    if (!payload) return;
                    if (payload.rememberMe) {
                        Account.setAccount(payload.data, 'localStorage');
                        Account.setAccessToken(payload?.data?.auth_key, 'localStorage');
                    } else {
                        Account.setAccount(payload.data);
                        Account.setAccessToken(payload?.data?.auth_key);
                    }
                    state.currentUser = payload.data;
                    state.isUserAuthorized = true;
                })
    }
});

export const {changUserLogged} = usersSlice.actions;
export default usersSlice.reducer;
