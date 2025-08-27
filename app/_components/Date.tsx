import { formatDistanceToNowStrict } from "date-fns";
import { DateProps } from "@/app/_types";

export default function Date({ date, styles }: DateProps) {
  return (
    <time dateTime={date} className={styles}>
      {formatDistanceToNowStrict(date)}
    </time>
  );
}
