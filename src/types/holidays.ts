export interface HolidayItem {
  index?: number;
  date: string;
  readableDate: string;
  name: string;
  diff?: number;
}

export interface HolidaysData {
  count: number;
  holidays: Array<HolidayItem>;
  nextHoliday?: HolidayItem | null;
  isHolidayToday?: boolean;
}
