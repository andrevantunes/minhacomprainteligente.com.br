import type { EssayCorrectionProps } from "./essay-correction.types";

import classNames from "classnames";
import { EssayCorrectedImage } from "../EssayCorrectedImage";
import { EssayTeacherMarkings } from "../EssayTeacherMarkings";
import { useState } from "react";
import { Card } from "@andrevantunes/andrevds";
const EssayCorrection = ({
  children,
  image,
  marks = [],
  className,
  ...props
}: EssayCorrectionProps) => {
  const cn = classNames("essay-correction", className);
  const [activeMark, setActiveMark] = useState(0);

  return (
    <Card className={cn} {...props}>
      <EssayCorrectedImage
        image={image}
        marks={marks}
        setActiveMark={setActiveMark}
        activeMark={activeMark}
        full
        fetching={false}
      />
      <EssayTeacherMarkings marks={marks} setActiveMark={setActiveMark} activeMark={activeMark} />
    </Card>
  );
};

export default EssayCorrection;
