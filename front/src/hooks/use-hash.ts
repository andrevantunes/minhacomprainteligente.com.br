import { isClient } from "@andrevantunes/andrevds-helpers/environment";
import { useEffect, useState } from "react";

export const useHash = (): [string, (newHash: string) => void] => {
  const [value, setValue] = useState(isClient() ? window.location.hash : "");
  const hashChangeHandler = () => setValue(isClient() ? window.location.hash : "");

  useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, []);

  const setHash = (newHash: string) => {
    if (!isClient()) return;
    if (newHash !== value) window.location.hash = newHash;
  };

  return [value, setHash];
};
