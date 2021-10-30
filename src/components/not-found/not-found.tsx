/* eslint-disable @next/next/no-img-element */
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import styles from './not-found.module.css';

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
        className={styles.photo}
        alt={'random photo from Colombia'}
        src={'https://source.unsplash.com/collection/9653593'}
        decoding={'async'}
        loading={'lazy'}
      />
    </>
  );
};
