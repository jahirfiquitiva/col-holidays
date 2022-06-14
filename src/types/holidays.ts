export interface DefaultHoliday {
  name: string;
  holidayName: string;
  date: string;
  holiday: string;
  altName?: string;
}

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

export interface PhotoData {
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  url: string;
  link: string;
}

