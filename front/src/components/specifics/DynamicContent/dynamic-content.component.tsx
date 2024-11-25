import type { ContentByBffStatusProps } from "./dynamic-content.types";

import { Ribo } from "@/components/adapters/Ribo";
import { getBffApi } from "@/requests";
import { useEffect, useState } from "react";
import jsonSchemaTranspiler from "@mesalva/json-schema-transpiler";
import { useRouter } from "next/router";

const DynamicContent = ({ path, status }: ContentByBffStatusProps) => {
  const [riboContent, setRiboContent] = useState(status["fetching"]);
  const router: any = useRouter();
  const { content = "", ...params } = router?.query;

  useEffect(() => {
    let isMounted = true;
    console.log('useEffect, path', path, params);
    getBffApi(path, params)
      .then((result) => {
        console.log('useEffect, then', result, isMounted);
        if (!isMounted) return;
        if (status?.[result?.status]) {
          console.log('useEffect, with status');
          setRiboContent(jsonSchemaTranspiler(result, status[result.status]));
        } else {
          console.log('useEffect, withdout status');
          setRiboContent(jsonSchemaTranspiler(result, status.default));
        }
      })
      .catch(() => {
        console.log('useEffect, catch');
        if (!isMounted) return;
        if (status?.error) return setRiboContent(status.error);
        setRiboContent(status.default);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return <Ribo>{riboContent}</Ribo>;
};

export default DynamicContent;
