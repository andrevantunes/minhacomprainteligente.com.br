import { RiboProps } from "@mesalva/ribo";

interface ContentByBffStatusProps {
  path: string;
  status: {
    fetching: RiboProps | RiboProps[];
    default: RiboProps | RiboProps[];
    error?: RiboProps | RiboProps[];
    [key: string]: RiboProps | RiboProps[] | undefined;
  };
}

export type { ContentByBffStatusProps };
