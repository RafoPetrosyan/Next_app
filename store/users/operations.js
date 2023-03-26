import {createAsyncThunk} from "@reduxjs/toolkit";
import httpClient from "../httpClient";

export const userSignIn = createAsyncThunk(
    'users/userSignIn', async (payload) => {
        try {
            const {data} = await httpClient.post(`/v1/user_account/session`, payload.values);
            return {
                data,
                rememberMe: payload.rememberMe,
            };
        } catch (e) {
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

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts', async () => {
        try {
            const {data} = await httpClient.get(`/v1/user_account/user_invitations?page%5Bnumber%5D=1&page%5Bsize%5D=20`);
            return data.data;
        } catch (e) {
            //
        }
    });
