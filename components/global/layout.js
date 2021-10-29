import Link from 'next/link';
import styles from './layout.module.css';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <header>
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/all'>All holidays</Link>
        </nav>
      </header>

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <p>
            Created by <a href='https://jahir.dev'>Jahir Fiquitiva</a>
          </p>
          <p>
            Heavily inspired by <a href='https://srhart.co/'>Sr. Hart</a>&apos;s{' '}
            <a href='https://esfestivo.co/'>esfestivo</a> project
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
