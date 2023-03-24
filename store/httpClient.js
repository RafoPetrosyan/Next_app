import axios from 'axios';
import Account from "../utils/Account";
import {changUserLogged} from "./users";
import {BASE_URL} from "../constants";
import {store} from "./index";

const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

httpClient.interceptors.request.use((config) => {
    const accessToken = Account.getAccessToken();
    if (accessToken) {
        config.headers['x-api-key'] = accessToken;
    }
    return config
});

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Account.delete();
            window.replace('/');
            store.dispatch(changUserLogged());
        }
        return Promise.reject(error)
    }
);

export default httpClient;
