import type { PropertySelectionProps } from "./property-selection.types";
import classNames from "classnames";
import { Button, Card, Checkbox, Display } from "@andrevantunes/andrevds";
import { StoreType, useStore } from "@/store";

const PropertySelection = ({
  children,
  className,
  src,
  href,
  name,
  id,
  checkAllowed,
  buttonLabel = "Gerenciar",
  buttonFull = false,
  buttons,
  ...props
}: PropertySelectionProps) => {
  const [{ properties }, setProperty] = useStore(StoreType.Cart);
  const handleOnClick = (event: any) => {
    if (event.target.checked) {
      // @ts-ignore
      setProperty({ properties: [...properties, { id }] });
    } else {
      // @ts-ignore
      setProperty({ properties: properties.filter((property) => id != property.id) });
    }
  };
  const cn = classNames("property-selection", className);
  return (
    <Card
      className={cn}
      style={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
      }}
      {...props}
    >
      <div style={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
        <img src={src} />
      </div>
      <Display size="sm" style={{ padding: 16, fontSize: 16 }}>
        {name}
      </Display>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {checkAllowed && <Checkbox onChange={handleOnClick} />}
        {href && <Button href={href}>{buttonLabel}</Button>}
        <div className="flex gap-1x">
          {buttons?.map((button) => (
            <Button key={button.href} {...button} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PropertySelection;
