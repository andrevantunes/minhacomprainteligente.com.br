import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { WithDateRangeProps } from "./with-date-range.types";

const WithDateRange = ({
  startDate = "",
  endDate = "",
  children,
  outside = false,
  fromISO = false,
}: WithDateRangeProps) => {
  const [show, setShow] = useState(false);

  const getDate = (date: string) => {
    if (fromISO) {
      return DateTime.fromISO(date).setLocale("pt-BR");
    }

    if (date.length === 19) {
      return DateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss").setLocale("pt-BR");
    } else if (date.length === 16) {
      return DateTime.fromFormat(date, "dd/MM/yyyy HH:mm").setLocale("pt-BR");
    } else {
      return DateTime.fromFormat(date, "dd/MM/yyyy").setLocale("pt-BR");
    }
  };

  const withinRange = () => {
    const now = DateTime.now().setLocale("pt-BR");

    const iStartDate = getDate(startDate);
    const iEndDate = getDate(endDate);

    if (!iStartDate.isValid) {
      console.error("Data inicial inválida");
      return false;
    }

    if (!iEndDate.isValid) {
      console.error("Data final inválida");
      return false;
    }

    if (iStartDate > iEndDate) {
      console.error("Data inicial não pode ser maior que data final");
      return false;
    }

    const isWithinRange = now >= iStartDate && now <= iEndDate;
    if (outside) return !isWithinRange;
    return isWithinRange;
  };

  useEffect(() => {
    if (withinRange()) setShow(true);
  }, []);

  return show ? <>{children}</> : <></>;
};

export default WithDateRange;
