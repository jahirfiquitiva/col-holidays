import Image from 'next/image';
import Link from 'next/link';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';

import { Component, ComponentProps } from '@/components/global/component';
import { Meta } from '@/components/global/meta';

import styles from './layout.module.css';

export const Layout: Component = (props: ComponentProps) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.container}>
      <Meta />

      <header>
        <nav>
          <Link href={'/'}>{t('home')}</Link>
          <Link href={'/all'}>{t('all-holidays')}</Link>
          <a
            href={'https://github.com/jahirfiquitiva/col-holidays'}
            rel={'noopener noreferrer'}
            target={'_blank'}
          >
            {t('source-code')}
          </a>
        </nav>
      </header>

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <Image
            src={'/static/favicon/android-icon-48x48.png'}
            width={24}
            height={24}
            alt={'Colombian Holidays app icon'}
          />
          <p>
            <Trans
              i18nKey={'common:created'}
              components={[
                <a
                  key={'jahir-link'}
                  href={'https://jahir.dev'}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                />,
              ]}
            />
          </p>
          <p>
            <Trans
              i18nKey={'common:inspired'}
              components={[
                <a
                  key={'srhart-link'}
                  href={'https://srhart.co/'}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                />,
                <a
                  key={'esfestivo-link'}
                  href={'https://esfestivo.co/'}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                />,
              ]}
            />
          </p>
        </div>
      </footer>
    </div>
  );
};
