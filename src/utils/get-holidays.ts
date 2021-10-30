/* eslint-disable @typescript-eslint/ban-ts-comment */
import colombianHolidays from 'colombia-holiday';

import englishNames from './../../locales/en/holidays.json';
import spanishNames from './../../locales/es/holidays.json';

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

const getHolidayNameForLanguage = (
  index: number,
  lang?: string,
  defaultName?: string,
): string | null | undefined => {
  if (!lang) return defaultName;
  let holidayName: string | null = null;
  try {
    // @ts-ignore
    if (lang.includes('en')) holidayName = englishNames[`${index}`];
    // @ts-ignore
    else if (lang.includes('es')) holidayName = spanishNames[`${index}`];
  } catch (e) {}
  return holidayName || defaultName;
};

export const getColombianHolidays = (
  language: string = 'es-CO',
  year?: number,
): HolidaysData => {
  const now = new Date();
  const mappedHolidays: Array<HolidayItem> = colombianHolidays(
    year || now.getFullYear(),
  ).map((holiday, index) => {
    const holidayDate = new Date(
      // @ts-ignore
      `${holiday.holiday.replace(/\//g, '-')}T00:00:00.000-05:00`,
    );
    return {
      index,
      readableDate: formatDate(holidayDate, language),
      // @ts-ignore
      date: holiday.holiday,
      name:
        // @ts-ignore
        getHolidayNameForLanguage(index, language, holiday.holidayName) ||
        // @ts-ignore
        holiday.holidayName,
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
