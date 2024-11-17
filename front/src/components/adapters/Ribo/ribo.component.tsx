import dynamic from "next/dynamic";

const Ribo = ({ children }: any) => {
  if (!children) return null;

  const RiboAdapter = dynamic(() => import("@/libs/ribo-adapter"));

  return <RiboAdapter>{children}</RiboAdapter>;
};

export default Ribo;
