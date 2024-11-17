import type { CalendarProps } from "@andrevantunes/andrevds";
import { Calendar as MarsCalendar } from "@andrevantunes/andrevds";
import Link from "../Link/link.component";

const Calendar = ({ linkComponent = Link, ...props }: CalendarProps) => {
  return <MarsCalendar linkComponent={linkComponent} {...props} />;
};

export default Calendar;
