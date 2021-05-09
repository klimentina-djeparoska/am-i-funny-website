import React from "react";
import '../styles/globals.css';
import Menu from "../components/menu";
import Footer from "../components/footer";
import Head from "next/head";
import wrapper from '../store';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
  return (
      <>
          <Head>
              <title>Am I Funny?</title>
              <meta name="description" content="Test your jokes and see how funny are you!" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <Menu/>
          <Component {...pageProps} />
          <Footer/>
      </>
  );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
