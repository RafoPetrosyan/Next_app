import {createAsyncThunk} from "@reduxjs/toolkit";
import {SOURCE_URL} from "../../constants";
import axios from "axios";

export const citiesRequest = createAsyncThunk(
    'cities/citiesRequest', async (payload) => {
        try {
            const {data} = await axios.get(`${SOURCE_URL}/cities`);
            return data;
        } catch (e) {
            console.log(e)
        }
    });
