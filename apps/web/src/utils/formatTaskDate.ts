import { dayjs } from "@/lib/dayjs";

export function formatTaskDate(date: Date | string) {
  return dayjs(date).format("D [de] MMMM [de] YYYY, dddd");
}
