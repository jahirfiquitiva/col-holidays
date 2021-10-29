import confetti from 'canvas-confetti';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useEffect } from 'react';

import { Component } from '@/components/global/component';
import useRequest from '@/hooks/useRequest';
import { HolidaysData } from '@/types/holidays';

const particleOptions = {
  particleCount: 250,
  spread: 100,
  colors: ['#FCD116', '#003893', '#CE1126'],
  disableForReducedMotion: true,
};

export const Home: Component = () => {
  const { t, lang } = useTranslation('home');
  const { data, loading } = useRequest<HolidaysData>(
    `/api/holidays?lang=${lang}`,
  );

  useEffect(() => {
    if (data && data.isHolidayToday) {
      confetti(particleOptions);
    }
    return () => {
      try {
        confetti.reset();
      } catch (e) {}
    };
  }, [data]);

  const renderHolidayData = () => {
    if (loading || !data) return <p>{t('common:loading')}...</p>;
    if (!data.isHolidayToday) {
      return (
        <>
          <h4>{t('not-today')}</h4>
          <br />
          <p>
            {t('next-holiday', {
              holidayDate: data.nextHoliday.readableDate,
              holidayName: data.nextHoliday.name,
            })}
          </p>
        </>
      );
    }
    return (
      <>
        <h4>{t('yes-it-is')}</h4>
        <br />
        <p>
          {t('today-holiday', {
            holidayName: data.nextHoliday.name,
          })}
        </p>
      </>
    );
  };

  return (
    <>
      <Image
        src={'/static/icons/icon-192x192.png'}
        width={144}
        height={144}
        alt={'Colombian Holidays app icon'}
      />
      <br />
      <h1>{t('its-holiday')}</h1>
      <br />
      {renderHolidayData()}
    </>
  );
};
