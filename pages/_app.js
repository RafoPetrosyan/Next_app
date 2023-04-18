import React, {useEffect} from "react";
import Head from "next/head";
import {Provider} from "react-redux";
import {isEmpty} from "lodash";
import cookies from "next-cookies";
import {ConfigProvider} from "antd";
import {IntlProvider} from "react-intl";
import {useRouter} from "next/router";
import store from "../store";
import Cookies from "../utils/cookies";
import httpClient from "../store/httpClient";
import {setCurrentUser, setUserAuthorized} from "../store/users";
import {theme} from "../styles/antdGlobalStyles";
import {parseQuery} from "../utils/helpers";
import messages from "../locales";
import "../styles/style.scss";
import 'react-horizontal-scrolling-menu/dist/styles.css';
import ModalRoot from "../views/ModalRoot/component";

const Application = ({Component, pageProps}) => {
    const router = useRouter();

    useEffect(() => {
        const currentUser = Cookies.getCookie('currentUser');
        const accessToken = Cookies.getCookie('accessToken');
        store.dispatch(setCurrentUser(currentUser));
        if (accessToken && !isEmpty(currentUser)) store.dispatch(setUserAuthorized(true));
    }, []);

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
            <Provider store={store}>
                <IntlProvider locale={router.locale} messages={messages[router.locale]}>
                    <ConfigProvider theme={theme}>
                        <Component {...pageProps} />
                        <ModalRoot/>
                    </ConfigProvider>
                </IntlProvider>
            </Provider>
        </>
    );
};

Application.getInitialProps = async ({Component, ctx}) => {
    ctx.store = store;
    const isServer = Boolean(ctx.req);

    if (!isEmpty(ctx.query?.slug)) ctx.params = await parseQuery(ctx.query.slug);

    if (isServer) {
        const {accessToken, language} = await cookies(ctx);

        if (language) ctx.locale = language;
        if (accessToken) httpClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return {pageProps}
}

export default Application;
