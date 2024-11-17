import type { WithDelayProps } from "./with-delay.types";
import { useEffect, useState } from "react";

const WithDelay = ({ children, delay = 1000 }: WithDelayProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeoutId);
  }, []);

  return show ? <>{children}</> : <></>;
};

export default WithDelay;
