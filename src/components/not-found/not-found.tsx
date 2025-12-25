/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { Component } from '@/components/global/component';

export const NotFound: Component = () => {
  const { t } = useTranslation('not-found');

  return (
    <>
      <h1>{t('not-found')}</h1>
      <p>{t('not-found-content')}</p>
      <br />
      <Link href={'/'}>
        <a>
          <button>{t('not-found-button')}</button>
        </a>
      </Link>
      <br />
      <img
        className={'photo'}
        alt={'random photo from Colombia'}
        src={'https://source.unsplash.com/collection/8308296?orientation=landscape'}
        decoding={'async'}
        loading={'lazy'}
      />
    </>
  );
};
