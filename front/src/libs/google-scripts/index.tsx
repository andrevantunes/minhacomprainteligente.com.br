import { RawScript } from "@/components";

const GA_ID = process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"];
const GTM_ID = process.env["NEXT_PUBLIC_GOOGLE_TAGMANAGER_ID"];
const OPTIMIZE_ID = process.env["NEXT_PUBLIC_GOOGLE_OPTIMIZE_ID"];

const GoogleScripts = () => (
  <>
    {/*<meta property="google-site-verification" content="" />*/}

    {GA_ID && <GAScript id={GA_ID} />}
    {OPTIMIZE_ID && <OptimizeScript id={OPTIMIZE_ID} />}
    {GTM_ID && <GtmScript id={GTM_ID} />}

    <RawScript
      script={`
      (function(w,l){
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start':new Date().getTime(),
          event:'gtm.js',
          config:'${GA_ID}',
          event:'optimize.activate'
        });
      })(window,'dataLayer');
    `}
    />
  </>
);

interface ScriptID {
  url?: string;
  id?: string;
}

function OptimizeScript({ id }: ScriptID) {
  if (!id) return null;
  return <script async src={`https://www.googleoptimize.com/optimize.js?id=${id}`} />;
}

function GtmScript({ id = "" }: ScriptID) {
  if (!id) return null;
  return <script async src={`https://www.googletagmanager.com/gtm.js?id=${id}`} />;
}

function GAScript({ id }: ScriptID) {
  if (!id) return null;
  return <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />;
}

export default GoogleScripts;
