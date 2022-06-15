import Image from 'next/image';
import confetti from 'canvas-confetti';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { Component } from '@/components/global/component';
import useRequest from '@/hooks/useRequest';
import { HolidaysData, PhotoData } from '@/types/holidays';

const particleOptions = {
  particleCount: 250,
  spread: 150,
  colors: ['#FCD116', '#003893', '#CE1126'],
  disableForReducedMotion: true,
  useWorker: true,
};

export const Home: Component = () => {
  const { t, lang } = useTranslation('home');
  const { data, loading } = useRequest<HolidaysData>(
    `/api/holidays?lang=${lang}`,
  );
  const { data: photoData, loading: photoLoading } = useRequest<PhotoData>(
    `/api/photo?country=Colombia`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      refreshInterval: 4320000,
    },
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
                  holidayName: data.nextHoliday.name,
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

  const renderCountryImage = () => {
    if (loading || photoLoading || !photoData || !photoData.url) return null;
    const photoDescription =
      photoData?.description || t('photo-alt', { country: 'Colombia' });
    return (
      <figure>
        <Image
          src={photoData?.url || ''}
          alt={photoData?.alt_description || photoDescription}
          layout={'responsive'}
          width={photoData?.width || 1080}
          height={photoData?.height || 608}
          placeholder={'blur'}
          blurDataURL={photoData?.blur_hash || ''}
          loading={'lazy'}
          decoding={'async'}
          style={{ backgroundColor: photoData?.color || 'rgba(0,0,0,0)' }}
        />
        <figcaption style={{ textAlign: 'center', marginTop: '0.8rem' }}>
          <small>
            <em>
              {photoDescription}
              <br />
              {t('source')}{' '}
              <a
                href={photoData?.author?.link || 'https://unsplash.com/'}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                {photoData?.author?.name || 'Unknown'}
              </a>
              {' on '}
              <a
                href={photoData?.link}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                Unsplash
              </a>
            </em>
          </small>
        </figcaption>
      </figure>
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{t('its-holiday')}</h1>
      <br />
      {renderHolidayData()}
      <br />
      {renderCountryImage()}
    </div>
  );
};
