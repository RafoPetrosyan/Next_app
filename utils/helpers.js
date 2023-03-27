import axios from "axios";

export const setAuthorizationHeader = (accessToken) => {
    if(accessToken) {
        axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
        return
    }
    axios.defaults.headers.Authorization = '';
};
