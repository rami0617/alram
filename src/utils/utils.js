import { format } from "date-fns";

export function nowDays() {
  const today = format(new Date(), "yyyy/MM/dd");
  const realTime = format(new Date(), "HH:mm");
  const now = (today + realTime).replace(/[^\w\s]/gi, '');

  return now;
}
