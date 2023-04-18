import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalType: '',
    modalProps: {},
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, { payload }) => {
            state.modalType = payload.modalType;
            state.modalProps = payload?.modalProps;
        },
        hideModal: () => ({...initialState})
    },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;