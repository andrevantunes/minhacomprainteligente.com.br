import type { ContentByBffStatusProps } from "./dynamic-content.types";

import { Ribo } from "@/components/adapters/Ribo";
import { getBffApi } from "@/requests";
import { useEffect, useState } from "react";
import jsonSchemaTranspiler from "@andrevantunes/json-schema-transpiler";
// import { useRouter } from "next/router";

const DynamicContent = ({ path, status }: ContentByBffStatusProps) => {
  const [riboContent, setRiboContent] = useState(status["fetching"]);
  // const router: any = useRouter();
  // const { content = "", ...params } = router?.query;

  useEffect(() => {
    let isMounted = true;
    getBffApi(path)
      .then((result) => {
        if (!isMounted) return;
        if (status?.[result?.status]) {
          setRiboContent(jsonSchemaTranspiler(result, status[result.status]));
        } else {
          setRiboContent(jsonSchemaTranspiler(result, status.default));
        }
      })
      .catch(() => {
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
