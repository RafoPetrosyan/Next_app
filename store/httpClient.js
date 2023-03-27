import axios from 'axios';
import {setUserAuthorized} from "./users";
import {BASE_URL} from "../constants";
import Cookies from "../utils/cookies";
import store from "./index";

const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

httpClient.interceptors.request.use((config) => {
    if(typeof window === 'undefined') return config;

    const accessToken = Cookies.getCookie('accessToken');
    if (accessToken) {
        axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config
});

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('httpClient response status', error.response.status);
        if (error.response && error.response.status === 401) {
            Cookies.removeCookie(null, 'accessToken');
            Cookies.removeCookie(null, 'currentUser');
            window.replace('/');
            store.dispatch(setUserAuthorized());
        }
        return Promise.reject(error)
    }
);

export default httpClient;
