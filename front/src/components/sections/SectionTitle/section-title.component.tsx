import type { SectionTitleProps } from "./section-title.types";

import { Hr, Heading, Skeleton } from "@andrevantunes/andrevds";
import { Breadcrumb } from "@/components";
import { ToggleButton } from "@/components/adapters/ToggleButton";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ensureStartWithSlash } from "@/helpers/links.helpers";

const SectionTitle = ({ title, children, breadcrumb, ...props }: SectionTitleProps) => {
  return (
    <section className="section-title" {...props}>
      {breadcrumb && <SectionTitleBreadcrumb list={breadcrumb} />}
      <div className="section-title__content">
        <Heading>{title}</Heading>
        {children}
      </div>
    </section>
  );
};

SectionTitle.Skeleton = () => <Skeleton height={24} />;

const SectionTitleBreadcrumb = ({ list }: { list: SectionTitleProps["breadcrumb"] }) => {
  const [firstItem] = list || [];
  const firstItemHref = firstItem?.href;

  const router = useRouter();
  const context = router?.query?.contexto;

  const href = useMemo(() => {
    if (typeof context === "string") return ensureStartWithSlash(context);
    if (firstItemHref) return ensureStartWithSlash(firstItemHref);
    return undefined;
  }, [context, firstItem]);

  return (
    <div className="section-title__breadcrumb">
      <div className="flex gap-sm">
        {href && (
          <ToggleButton
            href={href}
            className="section-title__breadcrumb__go-back-button"
            iconName="arrow-back"
            size="sm"
          />
        )}
        <div className="flex justify-content-between w-100">
          <Breadcrumb list={list} />
        </div>
      </div>
      <Hr className="mb-lg" />
    </div>
  );
};

export default SectionTitle;
