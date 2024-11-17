import type { HTMLProps } from "react";

type Column = string | number | Array<string | number>;

interface Columns {
  xs?: Column;
  sm?: Column;
  md?: Column;
  lg?: Column;
}

type ColumnsProps = Columns | Column;

interface GridProps extends Omit<HTMLProps<HTMLDivElement>, "as"> {
  columns?: ColumnsProps;
  gap?: number | string;
  as?: string | React.ReactNode;
  growing?: boolean;
}

export type { GridProps, ColumnsProps, Column };
