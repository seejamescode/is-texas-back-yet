import App, { Container } from "next/app";
import Head from "next/head";
import Router from "next/router";
import withGA from "next-ga";
import { injectGlobal } from "styled-components";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Libre+Franklin:400,700');

  :root {
    --orange: #bf5700;
  }

  body {
    background: var(--orange);
    color: #fff;
    font-family: 'Libre Franklin', sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
  }

  p {
    margin-top: 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  section {
    box-sizing: border-box;
    overflow: auto;
    padding: 4rem 2rem;
  }

  strong {
    font-weight: 700;
  }
`;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // Get current page’s initial props
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Is Texas back yet?</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withGA("UA-43808769-11", Router)(MyApp);
