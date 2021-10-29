import colombianHolidays from 'colombia-holiday';

const formatDate = (date, language = 'es-CO') => {
  return date.toLocaleString(language, {
    timeZone: 'America/Bogota',
    weekday: 'long',
    year: undefined,
    month: 'long',
    day: 'numeric',
  });
};

export const getColombianHolidays = (language = 'es-CO') => {
  const now = new Date();
  const mappedHolidays = colombianHolidays().map((holiday) => {
    const holidayDate = new Date(`${holiday.holiday.replace(/\//g, '-')}T00:00:00.000-05:00`);
    return {
      readableDate: formatDate(holidayDate, language),
      date: holiday.holiday,
      name: holiday.holidayName,
      diff: now.getTime() - holidayDate.getTime(),
    };
  });

  const nextHoliday = mappedHolidays.filter((it) => it.diff <= 0)[0];

  return {
    count: mappedHolidays.length,
    holidays: mappedHolidays.map((it) => ({ ...it, diff: undefined })),
    nextHoliday: { ...nextHoliday, diff: undefined },
    isHolidayToday: nextHoliday.diff === 0,
  };
};
