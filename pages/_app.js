import React from "react";
import Head from "next/head";
import {Provider} from "react-redux";
import store from "../store";

const Application = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no maximum-scale=1.0 user-scalable=no"
                />
                <meta content="ie=edge" httpEquiv="x-ua-compatible"/>
                <meta charSet="utf-8"/>
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
};

Application.getInitialProps = async ({Component, ctx}) => {
    let pageProps = {}
    ctx.store = store;
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }
    return {pageProps}
}

export default Application;
