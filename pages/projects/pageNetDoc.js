import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import Navbar from '../../Components/component_navbar/Navbar';
import Netdoc from '../../Components/ComponentNetDoc/NetDoc';

export default function pageNetDoc() {
  return (
    <div className={styles.container}>
      
      <div>
        <Navbar/>
      </div>
      
      <main className={styles.main}>
        <Netdoc/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
  