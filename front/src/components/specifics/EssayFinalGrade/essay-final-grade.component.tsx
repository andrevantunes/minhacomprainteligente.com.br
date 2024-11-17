import type { EssayFinalGradeProps } from "./essay-final-grade.types";

import classNames from "classnames";
import { Caption, Card, Heading, ItemText } from "@andrevantunes/andrevds";
import { useMemo } from "react";

const EssayFinalGrade = ({ finalGrade, maxGrade, className, ...props }: EssayFinalGradeProps) => {
  const cn = classNames("essay-final-grade", "text-center", "mb-lg", className);

  const formattedFinalGrade = useMemo(
    () => String(Number(finalGrade).toFixed(2)).replace(".00", ""),
    [finalGrade]
  );

  return (
    <Card className={cn} {...props}>
      <ItemText className="mb-xl">Nota final</ItemText>
      <Heading className="mb-xl" size="lg">
        {formattedFinalGrade}
      </Heading>
      {maxGrade ? (
        <>
          <Caption
            style={{ fontWeight: 700, display: "block" }}
            className="color-text-secondary mb-lg"
          >
            Nota máxima: {maxGrade}
          </Caption>
          <Caption style={{ fontSize: "12px" }} className="color-text-secondary">
            * Soma de todas as competências
          </Caption>
        </>
      ) : (
        ""
      )}
    </Card>
  );
};

export default EssayFinalGrade;
