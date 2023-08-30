/* pagina per gestionar els connexions */

import React from 'react';
import Image from "next/legacy/image";
import styles from '../../../styles/Home.module.css';
import Navbar from '../../../Components/component_navbar/Navbar';
import ConnexionsForm from '../../../Components/ComponentNetDoc/componentsConnexions/ConnexionsForm';
//import {protectPageNetDocRoute} from '../../api/auth/middleware';
import IsAuth from '../../../Components/IsAuth';

function GestionarConnexions() {
  return (
    <div className={styles.container}>
      <div>
        <Navbar/>
      </div>
      <main className={styles.main}>
        <ConnexionsForm/>
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
};

export default IsAuth(GestionarConnexions);