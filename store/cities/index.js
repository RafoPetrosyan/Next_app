import {createSlice} from "@reduxjs/toolkit";
import {citiesRequest} from "./operations";

const initialState = {
    cities: []
};

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(citiesRequest.fulfilled, (state, {payload}) => {
                state.cities = payload?.data
            })
    }
});

export default citiesSlice.reducer;
