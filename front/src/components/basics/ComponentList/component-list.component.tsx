import type { ComponentListProps } from "./component-list.types";

import classNames from "classnames";
import { Text, ComponentItem } from "@/components";
import { makeArray } from "@/helpers/object.helper";
import { Pagination, Skeleton, SkeletonVariants, TextField } from "@andrevantunes/andrevds";
import { useRouter } from "next/router";
import { useState } from "react";
import stringsCompare from "@/libs/strings-compare";
import { TitleProps } from "@/components/adapters/Title";

const ComponentList = ({
  emptyMessage = "Nenhum dado para exibir.",
  children,
  className,
  list,
  pagination,
  enableFilter,
  filterLabel = "Filtrar items",
  ...props
}: ComponentListProps) => {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const cn = classNames("component-list", className);
  const hasList = Array.isArray(list) && list.length > 0;

  if (!hasList) {
    return (
      <div className={cn}>
        <Text className="mt-2x">{emptyMessage}</Text>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const shouldHideTitle = (title?: TitleProps) => {
    if (!title || !query) return false;
    const text = typeof title === "string" ? title : title.children;
    if (typeof text !== "string") return false;
    return !stringsCompare(query, text);
  };

  const handleSelectPage = (page: number) => {
    router.push({ pathname: router.pathname, query: { ...router.query, page } });
  };

  return (
    <div className={cn} {...props}>
      {children}
      {enableFilter && (
        <div className="component-list__filter mb-lg">
          <TextField
            autoComplete="off"
            leftIconButton={{ name: "search" }}
            id="my-essay-filter"
            label={filterLabel}
            onChange={handleChange}
          />
        </div>
      )}
      <ul className="component-list__list">
        {list.map((item, key) => (
          <ComponentItem
            key={key}
            isLast={key === list.length - 1}
            checkRight
            {...item}
            className={classNames("component-list__list-item", {
              "display-none": shouldHideTitle(item.title),
            })}
          />
        ))}
      </ul>
      {pagination && (
        <div className="component-list__pagination py-lg">
          <Pagination onSelectPage={handleSelectPage} {...pagination} />
        </div>
      )}
    </div>
  );
};

ComponentList.Skeleton = () => (
  <div className="component-list component-list--is-skeleton">
    <Skeleton active className="mb-xl w-50" />
    {makeArray(4).map((_, key) => (
      <div key={key} className="mt-lg flex gap-md">
        <Skeleton active variant={SkeletonVariants.Circle} />
        <Skeleton active variant={SkeletonVariants.Paragraph} className="w-100" />
      </div>
    ))}
  </div>
);

export default ComponentList;
