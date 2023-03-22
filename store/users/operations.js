import {createAsyncThunk} from "@reduxjs/toolkit";
import Account from "../../utils/Account";
import httpClient from "../httpClient";

export const userSignIn = createAsyncThunk(
    'users/userSignIn', async (payload) => {
        try {
            const {data} = await httpClient.post(`/user/login`, payload.data.values);
            return {
                data,
                rememberMe: payload.data.rememberMe,
            };
        } catch (e) {
            payload.callback('Incorrect email or password');
        }
    });

export const userSignUp = createAsyncThunk(
    'users/userSignUp', async (payload) => {

        try {
            const {data} = await httpClient.post(`/user/create`, payload.data.values);

            return {
                data: data.data,
                rememberMe: payload.data.rememberMe,
            };
        } catch (e) {
            payload.callback(e.response.data?.message);
        }
    });

export const userLogAuth = createAsyncThunk(
    'users/userLogAuth', async (_, {getState}) => {
        const {users: {currentUser}} = getState();
        try {
            await httpClient.post(`/user/logout`,{id: currentUser?.id});
            Account.delete();
        } catch {
            //
        }
    });

export const fetchCurrentUser = createAsyncThunk(
    'users/getUser', async () => {
        try {
            const {data} =  await httpClient.post(`/user/user-get`);
            return data
        } catch {
            //
        }
    });