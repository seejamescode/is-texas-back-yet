import Head from "next/head";
import PlausibleProvider from "next-plausible";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  breakpoints: {
    md: 40,
    lg: 80,
  },
  colors: {
    orange: "#c75300",
    white: "#fff",
  },
  sizing: {
    xs: 0.875,
    sm: 1,
    md: 1.5,
    lg: 2,
    xl: 4,
  },
};

const GlobalStyle = createGlobalStyle`
  /* latin-ext */
  @font-face {
    font-family: 'Libre Franklin';
    font-style: normal;
    font-weight: 400;
    src: local('Libre Franklin'), local('LibreFranklin-Regular'), url(https://fonts.gstatic.com/s/librefranklin/v5/jizDREVItHgc8qDIbSTKq4XkRiUR2zcZiVbJsNo.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Libre Franklin';
    font-style: normal;
    font-weight: 400;
    src: local('Libre Franklin'), local('LibreFranklin-Regular'), url(https://fonts.gstatic.com/s/librefranklin/v5/jizDREVItHgc8qDIbSTKq4XkRiUf2zcZiVbJ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Libre Franklin';
    font-style: normal;
    font-weight: 700;
    src: local('Libre Franklin Bold'), local('LibreFranklin-Bold'), url(https://fonts.gstatic.com/s/librefranklin/v5/jizAREVItHgc8qDIbSTKq4XkRi2k_iI6q1vjitOh3oc.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Libre Franklin';
    font-style: normal;
    font-weight: 700;
    src: local('Libre Franklin Bold'), local('LibreFranklin-Bold'), url(https://fonts.gstatic.com/s/librefranklin/v5/jizAREVItHgc8qDIbSTKq4XkRi2k_iI0q1vjitOh.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  body {
    background: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Libre Franklin', sans-serif;
    font-display: swap;
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

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="istexasbackyet.com">
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Head>
            <title>Is Texas back yet?</title>
          </Head>
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
