import {createSlice} from "@reduxjs/toolkit";
import {categoryRequest} from "./operations";

const initialState = {
    category: []
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(categoryRequest.fulfilled, (state, {payload}) => {
                state.category = payload.data
            })
    }
});

export default categorySlice.reducer;
