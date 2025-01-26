import type { Page } from "@/types/page.types";
import type { GetServerSideProps } from "next";

import { AppTemplate, Seo } from "@/components";
import RiboAdapter from "@/libs/ribo-adapter";
import { getPage } from "@/requests";
import { StoreType, useStore } from "@/store";
import AuthenticationRequiredMessage from "../components/basics/AuthenticationRequiredMessage/authentication-required-message.component";

export const getServerSideProps: GetServerSideProps = async ({ resolvedUrl }) => {
  if (resolvedUrl.match(/\.ico$/)) return { props: { resolvedUrl } };
  if (resolvedUrl == "/") resolvedUrl = "/home";
  console.log("[...content]", resolvedUrl);
  const page = await getPage(resolvedUrl);
  return { props: { ...page, resolvedUrl } };
};

interface SSWPagesProps extends Page {
  resolvedUrl: string;
}

const Page = ({
  authenticated = false,
  resolvedUrl,
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
  console.log({ guest });
  const isBlockedPage = authenticated && guest;
  const seo = { title, description, image, canonical, robots, url };

  return (
    <>
      <Seo {...seo} />
      <AppTemplate {...props}>
        {isBlockedPage ? (
          <AuthenticationRequiredMessage />
        ) : (
          children && <RiboAdapter>{children}</RiboAdapter>
        )}
      </AppTemplate>
    </>
  );
};

export default Page;
