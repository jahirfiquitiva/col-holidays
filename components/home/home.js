import { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import confetti from 'canvas-confetti';
import useRequest from '../../hooks/useRequest';

const Home = () => {
  const { t, lang } = useTranslation('home');
  const { data, loading } = useRequest(`/api/holidays?lang=${lang}`);

  console.log({
    data,
    loading,
  });

  useEffect(() => {
    if (data && data.isHolidayToday) {
      confetti({
        particleCount: 250,
        spread: 100,
        colors: ['#FCD116', '#003893', '#CE1126'],
        disableForReducedMotion: true,
      });
    }
    return () => {
      confetti.reset();
    };
  }, [data]);

  const renderHolidayData = () => {
    if (loading) return <p>{t('common:loading')}...</p>;
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
      <h1>{t('its-holiday')}</h1>
      {renderHolidayData()}
    </>
  );
};

export default Home;