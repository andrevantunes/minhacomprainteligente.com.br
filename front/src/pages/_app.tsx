import { useEffect } from "react";
import { setUtms } from "@mesalva/utms";
import type { AppProps } from "next/app";

import "@/styles/index.scss";

import { HeadHTML } from "@/components";
import AppContext from "@/contexts/AppContext";
import GoogleScripts from "@/libs/google-scripts";
import ReduxDevtoolsContext from "@/store/devtools.context";
import PlatformContextProvider from "@/contexts/PlatformContext";
import AuthModalContextProvider from "@/contexts/AuthModalContext/auth-modal-context.component";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(setUtms, []);
  return (
    <>
      <HeadHTML />
      <GoogleScripts />

      <ReduxDevtoolsContext>
        <AppContext>
          <PlatformContextProvider>
            <AuthModalContextProvider>
              <Component {...pageProps} />
            </AuthModalContextProvider>
          </PlatformContextProvider>
        </AppContext>
      </ReduxDevtoolsContext>
    </>
  );
};

export default App;
