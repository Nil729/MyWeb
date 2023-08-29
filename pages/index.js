import Head from 'next/head'
import Image from "next/legacy/image"
import styles from '../styles/Home.module.css'
//import LoginForm from "../Components/Component_login/Login_form_old.js"
import LoginForm from "../Components/Component_login/Login_form.js"

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LoginForm/>
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
