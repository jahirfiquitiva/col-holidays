import confetti from 'canvas-confetti';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useEffect } from 'react';

import { Component } from '@/components/global/component';
import useRequest from '@/hooks/useRequest';
import { HolidaysData } from '@/types/holidays';

const particleOptions = {
  particleCount: 250,
  spread: 150,
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
          {data.nextHoliday && (
            <p>
              <Trans
                i18nKey={'home:next-holiday'}
                components={[
                  <b key={'holiday-date'} />,
                  <b key={'holiday-name'} />,
                ]}
                values={{
                  holidayDate: data.nextHoliday.readableDate,
                  holidayName: t(`holidays:${data.nextHoliday.index}`),
                }}
              />
            </p>
          )}
        </>
      );
    }
    return (
      <>
        <h4>{t('yes-it-is')}</h4>
        <br />
        {data.nextHoliday && (
          <p>
            <Trans
              i18nKey={'home:today-holiday'}
              components={[<b key={'holiday-name'} />]}
              values={{
                holidayName: t(`holidays:${data.nextHoliday.index}`),
              }}
            />
          </p>
        )}
      </>
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
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
    </div>
  );
};
