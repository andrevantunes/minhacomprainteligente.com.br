import Document, { Head, Html, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {process.env.NEXT_PUBLIC_ONESIGNAL_ID && (
            <>
              <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer />
              <script
                id="one-signal"
                dangerouslySetInnerHTML={{
                  __html: `window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function (OneSignal) {
  await OneSignal.init({
    appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_ID}",
    ${
      process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_ID &&
      `safari_web_id: "${process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_ID}",`
    }
    notifyButton: {
      enable: true,
    },
  });
});`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
