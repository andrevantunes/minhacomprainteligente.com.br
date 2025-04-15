import type { Page } from "@/types/page.types";
import type { GetServerSideProps } from "next";

import { AppTemplate, AuthenticationRequiredMessage, Seo } from "@/components";
import RiboAdapter from "@/libs/ribo-adapter";
import { getPage } from "@/requests";
import { StoreType, useStore } from "@/store";

export const getServerSideProps: GetServerSideProps = async ({ resolvedUrl }) => {
  const page = await getPage("dashboard/products/{id}");
  const id = resolvedUrl.replace("/dashboard/products/", "");
  return { props: { ...page, resolvedUrl, id } };
};

interface SSWPagesProps extends Page {
  resolvedUrl: string;
  id?: string;
}

const Page = ({
  authenticated = false,
  resolvedUrl,
  id,
  children,
  title,
  description,
  image,
  canonical,
  robots,
  url,
  ...props
}: SSWPagesProps) => {
  const [{ guest }] = useStore(StoreType.User);
  const isBlockedPage = authenticated && guest;
  const seo = { title, description, image, canonical, robots, url };
  return (
    <>
      <Seo {...seo} />
      <AppTemplate {...props}>
        {isBlockedPage ? (
          <AuthenticationRequiredMessage />
        ) : (
          children && (
            <RiboAdapter>
              {{
                component: "DynamicContent",
                path: `products/${id}`,
                status: { default: children },
              }}
            </RiboAdapter>
          )
        )}
      </AppTemplate>
    </>
  );
};

export default Page;
