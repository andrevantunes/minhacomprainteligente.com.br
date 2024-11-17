import type { AppContextProps } from "./app-content.types";

import { useEffect } from "react";

import { useStore, StoreType, UserStore } from "@/store";
import { GlobalLoading } from "@andrevantunes/andrevds";
import { autoColorMode } from "@/helpers/color-mode.helper";

const AppContext = ({ children }: AppContextProps) => {
  const [{ guest, fetching }] = useStore(StoreType.User);

  useEffect(() => {
    autoColorMode();
    UserStore.validate();
  }, []);

  return (
    <>
      <GlobalLoading isLoading={!guest && fetching} />
      {children}
    </>
  );
};

export default AppContext;
