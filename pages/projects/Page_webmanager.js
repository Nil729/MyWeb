import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import Navbar from '../../Components/Navbar/Navbar';
import {Webmanager} from '../../Components/CompWebmanager/Webmanager';

export default function Page_render_webmanager() {
    return (
      <div className={styles.container}>

        <Navbar/>
        
        <main className={styles.main}>
          <Webmanager/>
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
  