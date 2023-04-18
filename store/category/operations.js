import {createAsyncThunk} from "@reduxjs/toolkit";
import {SOURCE_URL} from "../../constants";
import axios from "axios";

export const categoryRequest = createAsyncThunk(
    'category/categoryRequest', async () => {
        try {
            const {data} = await axios.get(`${SOURCE_URL}/categories`);
            return data;
        } catch (e) {
            console.log(e)
        }
    });
