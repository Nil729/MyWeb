


/* pagina per gestionar les xarxes */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Image from "next/legacy/image";
import styles from '../../../styles/Home.module.css';
import Navbar from '../../../Components/component_navbar/Navbar';
import NavbarNetdoc from  '../../../Components/component_navbar/NavbarNetdoc'
import XarxaForm from '../../../Components/ComponentNetDoc/componentsXarxa/XarxaForm';
import IsAuth from '../../../Components/IsAuth';
import { Nav } from 'office-ui-fabric-react';

function GestionarXarxa() {

    return (

      <div className={styles.container}>
      
        <div>
          <Navbar/>
          <NavbarNetdoc/>
        </div>
        
        <main className={styles.main}>
          <XarxaForm/>
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

export default IsAuth(GestionarXarxa);



