import React, {useEffect} from "react";
import Head from "next/head";
import {Provider} from "react-redux";
import {isEmpty} from "lodash";
import cookies from "next-cookies";
import store from "../store";
import Cookies from "../utils/cookies";
import httpClient from "../store/httpClient";
import {setCurrentUser, setUserAuthorized} from "../store/users";

const Application = ({Component, pageProps}) => {
    useEffect(() => {
        const currentUser = Cookies.getCookie('currentUser');
        const accessToken = Cookies.getCookie('accessToken');
        store.dispatch(setCurrentUser(currentUser));
        if (accessToken && !isEmpty(currentUser)) store.dispatch(setUserAuthorized(true));
    }, [store.getState().users]);

    return (
        <>
            <Head>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, shrink-to-fit=no maximum-scale=1.0 user-scalable=no"
                />
                <meta content="ie=edge" httpEquiv="x-ua-compatible"/>
                <meta charSet="utf-8"/>
                <title>Next JS App</title>
            </Head>
            <Provider store={store}><Component {...pageProps} /></Provider>
        </>
    );
};

Application.getInitialProps = async ({Component, ctx}) => {
    ctx.store = store;
    ctx.dispatch = store.dispatch;
    const isServer = Boolean(ctx.req);
    if (isServer) {
        const {accessToken} = await cookies(ctx);
        if (accessToken) {
            httpClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return {pageProps}
}

export default Application;
