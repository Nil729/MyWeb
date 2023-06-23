
/* pagina per gestionar els dispositius */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Image from 'next/image';
import styles from '../../../styles/Home.module.css';
import Navbar from '../../../Components/component_navbar/Navbar';
import DispositiusForm from '../../../Components/ComponentNetDoc/componentsDispositius/DispositiuForm';



export default function GestionarDispositius() {

    return (
        <div className={styles.container}>
      
        <div>
          <Navbar/>
        </div>
        
        <main className={styles.main}>
          <DispositiusForm/>
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