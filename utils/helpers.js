import axios from "axios";

export const setAuthorizationHeader = (accessToken) => {
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
};