import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {this.props.styleTags}
          <link rel="manifest" href="./static/manifest.json" />
          <link rel="shortcut icon" href="./static/favicon.ico" />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#c75300" />
          <meta
            name="description"
            content="Let's check if our Texas Longhorns are back..."
          />
          <meta property="og:title" content="Is Texas Back Yet?" />
          <meta
            property="og:description"
            content="Let's check if our Texas Longhorn’s football program is back..."
          />
          <meta
            property="og:image"
            content="https://istexasbackyet.com/static/thumbnail-title.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://istexasbackyet.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Is Texas Back Yet?" />
          <meta
            name="twitter:description"
            content="Let's check if our Texas Longhorns are back..."
          />
          <meta
            name="twitter:image"
            content="https://istexasbackyet.com/static/thumbnail-title.png"
          />
          <meta name="twitter:creator" content="@seejamescode" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="./static/icon-57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="./static/icon-72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="./static/icon-114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="./static/icon-144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="./static/icon-512.png"
          />

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <link
            href="./static/splash-2048.png"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./static/splash-1668.png"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./static/splash-1536.png"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./static/splash-1125.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./static/splash-1242.png"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./static/splash-750.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="./static/splash-640.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
