import colombianHolidays from 'colombia-holiday';

const getDateInColombia = (date) => {
  let actualDate = date ? new Date(date) : new Date();
  return new Date(actualDate.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
};

export const getColombianHolidays = (language = 'es-CO') => {
  const now = getDateInColombia();
  const mappedHolidays = colombianHolidays().map((holiday) => {
    const holidayDate = new Date(holiday.holiday);
    const readableDate = holidayDate.toLocaleString(language, {
      timeZone: 'America/Bogota',
      weekday: 'long',
      year: undefined,
      month: 'long',
      day: 'numeric',
    });
    holidayDate.setTime(holidayDate.getTime() - 5 * 3600 * 1000);
    return {
      readableDate,
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
