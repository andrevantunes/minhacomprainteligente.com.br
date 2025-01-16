import type { Page } from "@/types/page.types";
import type { GetServerSideProps } from "next";

import { AppTemplate, Seo } from "@/components";
import RiboAdapter from "@/libs/ribo-adapter";
import { getPage } from "@/requests";

export const getServerSideProps: GetServerSideProps = async ({ resolvedUrl }) => {
  const page = await getPage("dashboard/propriedades/{hash}");
  const hash = resolvedUrl.replace("/dashboard/propriedades/", "");
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
        <RiboAdapter>
          {{
            component: "DynamicContent",
            path: `properties/${hash}`,
            status: { default: children },
          }}
        </RiboAdapter>
      </AppTemplate>
    </>
  );
};

export default Page;
