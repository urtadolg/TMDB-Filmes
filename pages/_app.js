import React from "react";
import "../styles/globals.scss";
import Layout from "../components/layout/Layout";
import store from "../store/index";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
