import type { Page } from "@/types/page.types";
import type { GetServerSideProps } from "next";
import { AppTemplate, Seo } from "@/components";
import RiboAdapter from "@/libs/ribo-adapter";
import { getPage } from "@/requests";

function getHashFromUrl(resolvedUrl: string){
  if(!/(payment\/)(\d+)/.test(resolvedUrl)) return  null;
  return resolvedUrl
    .replace(/(payment\/)(\d+)/, "$2")
    .replace(/(\d+)\/.*/, "$1")
    .replace(/\//g, "");
}
export const getServerSideProps: GetServerSideProps = async ({ resolvedUrl }) => {
  const templatePath = resolvedUrl.replace(/(payment\/)(\d+)/, "$1{hash}");
  const hash = getHashFromUrl(resolvedUrl);
  const page = await getPage(templatePath);
  return { props: { ...page, resolvedUrl, hash } };
};

interface SSWPagesProps extends Page {
  resolvedUrl: string;
  hash?: string;
}

const Page = ({
  authenticated = false,
  resolvedUrl,
  hash,
  children,
  title,
  description,
  image,
  canonical,
  robots,
  url,
  ...props
}: SSWPagesProps) => {
  const seo = { title, description, image, canonical, robots, url };
  return (
    <>
      <Seo {...seo} />
      <AppTemplate {...props}>
        { hash ? (
          <RiboAdapter>
            {{
              component: "DynamicContent",
              path: `carts/${hash}`,
              status: { default: children },
            }}
          </RiboAdapter>
        ) : (
          <RiboAdapter>{children}</RiboAdapter>
        )}
      </AppTemplate>
    </>
  );
};

export default Page;
