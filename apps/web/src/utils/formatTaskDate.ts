import { dayjs } from "@/lib/dayjs";

const DEFAULT_FORMAT = "D [de] MMMM [de] YYYY, dddd";

export function formatTaskDate(date: Date | string, format?: string) {
  return dayjs(date).format(format ?? DEFAULT_FORMAT);
}
