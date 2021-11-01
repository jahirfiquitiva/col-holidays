export interface HolidayItem {
  index?: number;
  date: string;
  readableDate: string;
  name: string;
  timeDifference?: number;
  itsToday?: boolean;
}

export interface HolidaysData {
  count: number;
  holidays: Array<HolidayItem>;
  nextHoliday?: HolidayItem | null;
  isHolidayToday?: boolean;
  now?: string;
}
