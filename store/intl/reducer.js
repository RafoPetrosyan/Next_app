import enLocale from 'locales/en';
import hyLocale from 'locales/hy';
import ruLocale from 'locales/ru';
import {createReducer} from "@reduxjs/toolkit";
import {changeLanguages} from "./action";

const initialState = {
    ...hyLocale,
};

const intlReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeLanguages, (state, action) => {

            switch (action.payload) {
                case 'en':
                    return enLocale
                case 'ru':
                    return ruLocale
                case 'hy':
                    return hyLocale
                default:

                    return {...state};
            }
        })
})

export default intlReducer;
