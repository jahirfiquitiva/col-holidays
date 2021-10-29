import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import styles from './layout.module.css';

const Layout = (props) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.container}>
      <header>
        <nav>
          <Link href='/'>{t('home')}</Link>
          <Link href='/all'>{t('all-holidays')}</Link>
        </nav>
      </header>

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <p>
            <Trans
              i18nKey='common:created'
              components={[
                <a href='https://jahir.dev' rel={'noopener noreferrer'} target={'_blank'} />,
              ]}
            />
          </p>
          <p>
            <Trans
              i18nKey='common:inspired'
              components={[
                <a href='https://srhart.co/' rel={'noopener noreferrer'} target={'_blank'} />,
                <a href='https://esfestivo.co/' rel={'noopener noreferrer'} target={'_blank'} />,
              ]}
            />
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
