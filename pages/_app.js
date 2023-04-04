import React, {useEffect, useMemo} from "react";
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
import 'antd/dist/reset.css';

const Application = ({Component, pageProps}) => {
    const router = useRouter();
    const language = useMemo(() => router.locale, [router.locale]);

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
                <IntlProvider locale={language} messages={messages[language]}>
                    <ConfigProvider theme={theme}>
                        <Component {...pageProps} />
                    </ConfigProvider>
                </IntlProvider>
            </Provider>
        </>
    );
};

Application.getInitialProps = async ({Component, ctx}) => {
    ctx.store = store;
    if(!isEmpty(ctx.query?.slug)) {
        ctx.params = await parseQuery(ctx.query.slug);
    }
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
