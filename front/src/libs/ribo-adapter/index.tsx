import { AccessesStore, StoreType, UserStore, useStore } from "@/store";
import { useEffect, useState } from "react";

import { riboSettings } from "@/configs/ribo.config";
import OriginalRibo, { RiboProps as OriginalRiboProps } from "@mesalva/ribo";
import { useRouter } from "next/router";

export type RiboProps = Pick<OriginalRiboProps, "children">;

const RiboAdapter = ({ children }: RiboProps) => {
  const [{ fetched }] = useStore(StoreType.Accesses);
  const [accesses, setAccesses] = useState(AccessesStore.getFullAccesses());
  const [user, setUser] = useState(UserStore.getUserStore());
  const router = useRouter();

  useEffect(() => {
    if (fetched) {
      setAccesses(AccessesStore.getFullAccesses());
      setUser(UserStore.getUserStore());
    }
  }, [fetched]);

  const data = {
    ...accesses,
    accesses,
    user,
    router,
  };

  return (
    <OriginalRibo settings={riboSettings} accesses={{ active: true, data }}>
      {children}
    </OriginalRibo>
  );
};

export default RiboAdapter;
