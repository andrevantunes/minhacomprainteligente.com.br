import type { RawScriptProps } from "./raw-script.types";

const RawScript = ({ type = "text/javascript", script }: RawScriptProps) => {
  return <script type={type} dangerouslySetInnerHTML={{ __html: script }} />;
};

export default RawScript;
