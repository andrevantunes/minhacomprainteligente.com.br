import { Tabs as MarsTabs, TabsProps } from "@andrevantunes/andrevds";
import { LinkAdapter, Ribo } from "@/components";

const Tabs = ({ tabs = [], ...props }: TabsProps) => {
  return (
    <MarsTabs
      {...props}
      LinkComponent={LinkAdapter}
      tabs={tabs.map(({ children, ...tabs }) => ({ ...tabs, children: <Ribo>{children}</Ribo> }))}
    />
  );
};

export default Tabs;
