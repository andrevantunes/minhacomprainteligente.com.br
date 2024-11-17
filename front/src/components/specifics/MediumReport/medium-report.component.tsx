import { Link } from "@/components";
import classNames from "classnames";
import { MediumReportProps } from "./medium-report.types";

import dictionary from "@/configs/dictionary";

const mediumDictionary = dictionary.medium;

const MediumReport = ({ className, href, ...props }: MediumReportProps) => {
  const cn = classNames("medium-report", "text--size-sm", className);

  return (
    <>
      {href && (
        <div className={cn} {...props}>
          <Link
            href={href}
            target="blank"
            variant="secondary"
            iconName="alert-circle"
            iconSize="sm"
          >
            {mediumDictionary.report}
          </Link>
        </div>
      )}
    </>
  );
};

export default MediumReport;
