
/* 
    Component hon es mostrerar les diferents opcions que te l'usuari per gestionar la seva infraestructura de xarxa
    - Gestionar dispositus
    - Gestionar Xarxes
    - Gestionar Ubicacions
    - Gestionar Connexions
*/

import React from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

const NetworkManagementComponent = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleCardClick = (route) => {
    router.push(route);
  };

  return (
    <div>
      <div className="header">
        <h1><b>NetDoc</b></h1>
        <p>An application for efficiently managing your network infrastructure.</p>
      </div>
      <div className="card-container">
        <div className="card" onClick={() => handleCardClick('/projects/pages_netdoc/gestionar-dispositius')}>
          <h2>Device Management</h2>
          <p>
            Here you can define and manage the different devices connected to the network.  
          </p> 
        </div>
        <div className="card" onClick={() => handleCardClick('/projects/pages_netdoc/gestionar-xarxes')}>
          <h2>Network Management </h2>
          <p> 
            This section allows you to define different networks. The networks can be associated with different devices.
          </p>
        </div>
        <div className="card" onClick={() => handleCardClick('/projects/pages_netdoc/gestionar-ubicacions')}>
          <h2>Location Management</h2>
          <p>
            Here you can define and manage the different physical locations of devices connected to the network. Each location can have multiple associated devices.
          </p>
        </div>
        <div className="card" onClick={() => handleCardClick('/projects/pages_netdoc/gestionar-connexions')}>
          <h2>Connection Management</h2>
          <p> Here you can define and manage the different connections between devices. Whith a configuration of the connection type, the ports and the vlans.</p>
        </div>
      </div>
    </div>
  );
};
export default NetworkManagementComponent;