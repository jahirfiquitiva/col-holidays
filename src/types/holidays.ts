export interface HolidayItem {
  date: string;
  readableDate: string;
  name: string;
  diff?: number;
}

export interface HolidaysData {
  count: number;
  holidays: Array<HolidayItem>;
  nextHoliday: HolidayItem;
  isHolidayToday?: boolean;
}
