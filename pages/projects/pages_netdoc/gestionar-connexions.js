/* pagina per gestionar els connexions */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Image from "next/legacy/image";
import styles from '../../../styles/Home.module.css';
import Navbar from '../../../Components/component_navbar/Navbar';
import ConnexionsForm from '../../../Components/ComponentNetDoc/componentsConnexions/ConnexionsForm';

export default function GestionarConnexions() {

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
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    );
};