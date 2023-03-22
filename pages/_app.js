import React from "react";
import App from 'next/app';
import {Provider, ReactReduxContext} from "react-redux";
import { createWrapper } from 'next-redux-wrapper';
import store from "../store";
const makeStore = () => store;
const wrapper = createWrapper(makeStore);

class Application extends App {
  static contextType = ReactReduxContext;

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {};
    return { pageProps };
  }

  render = () => {
    const { Component, pageProps, layoutInitialProps } = this.props;
    const Layout = Component.Layout || React.Fragment;

    return (
        <Provider store={store}>
          <Layout {...layoutInitialProps} {...Component.layoutProps}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
    );
  };
}

export default wrapper.withRedux(Application);