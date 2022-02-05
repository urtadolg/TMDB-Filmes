import React from "react";
import Head from "next/head";
import "../styles/globals.scss";
import Layout from "../components/layout/Layout";
import store from "../store/index";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Space+Grotesk&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
