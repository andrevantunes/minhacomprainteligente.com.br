import type { SkeletonProps } from "@andrevantunes/andrevds";
import type { FC, HTMLProps, PropsWithChildren } from "react";

interface ComponentTypeWithSkeleton extends FC {
  Skeleton: FC<SkeletonProps>;
}

interface ComponentType
  extends Omit<PropsWithChildren<HTMLProps<HTMLDivElement>>, "list" | "size" | "content"> {}

export type { ComponentTypeWithSkeleton, ComponentType };
