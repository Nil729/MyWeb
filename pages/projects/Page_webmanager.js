import Head from 'next/head';
import Image from "next/legacy/image";
import styles from '../../styles/Home.module.css';
import Navbar from '../../Components/component_navbar/Navbar';
import {Webmanager} from '../../Components/CompWebmanager/Webmanager';

export default function Page_render_webmanager() {
  return (
    <div className={styles.container}>
      
      <div>
        <Navbar/>
      </div>
      
      <main className={styles.main}>
        <Webmanager/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >          
        <span className={styles.logo}>
          <Image src="/logoFooter.png" alt="Vercel Logo" width={100} height={100} />
        </span>
          Powered by Nil Piñana{' '}
        </a>
      </footer>
    </div>
  );
}
  