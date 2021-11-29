/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HolidaysData, HolidayItem, DefaultHoliday } from '@/types/holidays';

const hoursInADay = 24;
const minutesInAnHour = 60;
const secondsInAMinute = 60;
const millisInASecond = 1000;
const millisInADay =
  hoursInADay * minutesInAnHour * secondsInAMinute * millisInASecond;

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
  holiday: DefaultHoliday,
  lang?: string,
): string => {
  const { holidayName } = holiday;
  if (!lang) return holidayName;
  try {
    // @ts-ignore
    if (lang.includes('en')) return holiday.altName || holidayName;
  } catch (e) {}
  return holidayName;
};

const getIfDateIsToday = (timeInMillis?: number): boolean => {
  if (typeof timeInMillis === 'undefined') return false;
  const isInTheFuture = (timeInMillis || -1) < 0;
  if (isInTheFuture) return false;
  const isWithinToday = (timeInMillis || -1) <= millisInADay;
  return isWithinToday && timeInMillis >= 0;
};

export const getColombianHolidays = (
  holidaysList: Array<DefaultHoliday>,
  language: string = 'es-CO',
): HolidaysData => {
  const now = new Date();

  holidaysList.sort((a, b) => {
    const holidayDateA = new Date(
      // @ts-ignore
      `${a.holiday.replace(/\//g, '-')}T00:00:00.000-05:00`,
    );
    const holidayDateB = new Date(
      // @ts-ignore
      `${b.holiday.replace(/\//g, '-')}T00:00:00.000-05:00`,
    );
    return holidayDateA.getTime() - holidayDateB.getTime();
  });

  const mappedHolidays: Array<HolidayItem> = holidaysList.map(
    (holiday, index) => {
      const holidayDate = new Date(
        // @ts-ignore
        `${holiday.holiday.replace(/\//g, '-')}T00:00:00.000-05:00`,
      );
      const timeDifference = now.getTime() - holidayDate.getTime();
      return {
        index,
        readableDate: formatDate(holidayDate, language),
        // @ts-ignore
        date: holiday.holiday,
        name: getHolidayNameForLanguage(holiday, language),
        timeDifference,
        itsToday: getIfDateIsToday(timeDifference),
      };
    },
  );

  const [nextHoliday] = mappedHolidays.filter((it) => {
    return (
      typeof it !== 'undefined' && (it.itsToday || (it.timeDifference || 0) < 0)
    );
  });

  return {
    count: mappedHolidays.length,
    holidays: mappedHolidays.map((it) => ({
      ...it,
      timeDifference: undefined,
    })),
    nextHoliday: nextHoliday
      ? { ...nextHoliday, timeDifference: undefined }
      : null,
    isHolidayToday: nextHoliday?.itsToday,
    now: now.toISOString(),
  };
};
