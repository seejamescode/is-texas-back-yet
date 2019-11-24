import App, { Container } from "next/app";
import Head from "next/head";
import Router from "next/router";
import withGA from "next-ga";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Libre+Franklin:400,700');

  body {
    background: #bf5700;
    color: #fff;
    font-family: 'Libre Franklin', sans-serif;
    margin: 0;
    padding: 0;
  }

  p {
    margin: 0;
  }

  strong {
    font-weight: 700;
  }
`;

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <>
        <GlobalStyle />
        <Head>
          <title>Is Texas back yet?</title>
        </Head>
        <Component />
      </>
    );
  }
}

export default withGA("UA-43808769-11", Router)(MyApp);
