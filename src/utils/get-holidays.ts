/* eslint-disable @typescript-eslint/ban-ts-comment */
import colombianHolidays from 'colombia-holiday';

import { HolidaysData, HolidayItem } from '@/types/holidays';

const formatDate = (date: Date, language: string = 'es-CO') => {
  return date.toLocaleString(language, {
    timeZone: 'America/Bogota',
    weekday: 'long',
    year: undefined,
    month: 'long',
    day: 'numeric',
  });
};

export const getColombianHolidays = (
  language: string = 'es-CO',
  year?: number,
): HolidaysData => {
  const now = new Date();
  const mappedHolidays: Array<HolidayItem> = colombianHolidays(
    year || now.getFullYear(),
  ).map((holiday) => {
    const holidayDate = new Date(
      // @ts-ignore
      `${holiday.holiday.replace(/\//g, '-')}T00:00:00.000-05:00`,
    );
    return {
      readableDate: formatDate(holidayDate, language),
      // @ts-ignore
      date: holiday.holiday,
      // @ts-ignore
      name: holiday.holidayName,
      diff: now.getTime() - holidayDate.getTime(),
    };
  });

  const [nextHoliday] = mappedHolidays.filter((it) => (it.diff || 1) <= 0);

  return {
    count: mappedHolidays.length,
    holidays: mappedHolidays.map((it) => ({ ...it, diff: undefined })),
    nextHoliday: { ...nextHoliday, diff: undefined },
    isHolidayToday: nextHoliday.diff === 0,
  };
};
