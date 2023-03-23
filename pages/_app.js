import React, {useEffect, useState} from "react";
import {Provider} from "react-redux";
import {store, wrapper} from "../store";
import Head from "next/head";

const Application = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    const {pageProps} = props;
    const [ mounted, setMounted ] = useState(true);

    // useEffect(() => setMounted(true), []);   // at init only

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
                {mounted && <Component {...pageProps} />}
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
