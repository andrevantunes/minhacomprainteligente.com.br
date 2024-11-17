import Head from "next/head";
import { ScriptProps } from "./script.types";

const Script = ({ script, type = "text/javascript", ...props }: Partial<ScriptProps>) => {
  return (
    <Head>
      <script type={type} {...props}>
        {script}
      </script>
    </Head>
  );
};

export default Script;
