import {createAction} from '@reduxjs/toolkit';

export const changeLanguages = createAction('changeLanguages', (lang) => {
    return {payload: lang}
})
