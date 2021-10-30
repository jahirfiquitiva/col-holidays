import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { Component } from '@/components/global/component';
import useRequest from '@/hooks/useRequest';
import { HolidaysData } from '@/types/holidays';

const buildYearsList = (upcomingYears: number = 5): Array<number> => {
  const years = [new Date().getFullYear()];
  const [thisYear] = years;
  for (let i = thisYear + 1; i < thisYear + upcomingYears; i++) {
    years.push(i);
  }
  return years;
};

export const List: Component = () => {
  const yearsList = buildYearsList();
  const [currentYear, setCurrentYear] = useState(`${yearsList[0]}`);

  const { t, lang } = useTranslation('common');
  const { data, loading } = useRequest<HolidaysData>(
    `/api/holidays?lang=${lang}&year=${currentYear}`,
  );
  return (
    <>
      <h1>Holidays in {currentYear}</h1>
      <div>
        <label htmlFor={'year-select'}>Select a year:</label>
        <select
          defaultValue={'2021'}
          name={'year-select'}
          value={currentYear}
          onChange={(e) => {
            setCurrentYear(e.target.value);
          }}
        >
          {yearsList.map((it) => {
            return (
              <option key={it} value={`${it}`}>
                {it}
              </option>
            );
          })}
        </select>
      </div>
      <br />
      {loading && <p>{t('loading')}</p>}
      {!loading && data && (
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Holiday</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data?.holidays?.map((holiday) => {
              return (
                <tr key={holiday.index}>
                  <td>{holiday.name}</td>
                  <td>{holiday.readableDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
