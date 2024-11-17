import { useEffect, useState } from "react";
import Router from "next/router";
import { ProgressIndicator } from "@andrevantunes/andrevds";

const ProgressBar = () => {
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleStart = () => {
    setFetching(true);
    setFetched(false);
  };

  const handleStop = () => {
    setFetching(false);
    setFetched(true);
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleStop);
    Router.events.on("routeChangeError", handleStop);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleStop);
      Router.events.off("routeChangeError", handleStop);
    };
  }, []);

  return <ProgressIndicator fetching={fetching} fetched={fetched} />;
};

export default ProgressBar;
