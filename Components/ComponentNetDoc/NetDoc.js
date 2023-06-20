
/* 
    Component hon es mostrerar les diferents opcions que te l'usuari per gestionar la seva infraestructura de xarxa
    - Gestionar dispositus
    - Gestionar Xarxes
    - Gestionar Ubicacions
    - Gestionar Connexions
*/

import React from 'react';
import { useRouter } from 'next/router';

const NetworkManagementComponent = () => {
  const router = useRouter();

  const handleCardClick = (route) => {
    router.push(route);
  };

  return (
    <div>
      <div className="header">
        <h1>NetDoc</h1>
        <p>Aplicació per gestionar la infraestructura de xarxa</p>
      </div>
      <div className="card-container">
        <div className="card" onClick={() => handleCardClick('/projects/pages_netdoc/gestionar-dispositius')}>
          <h2>Gestionar Dispositius</h2>
          <p>Aquí pots gestionar els teus dispositius.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('/projects/pages_netdoc/gestionar-xarxes')}>
          <h2>Gestionar Xarxes</h2>
          <p>Aquí pots gestionar les teves xarxes.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('/projects/pages_netdoc/gestionar-ubicacions')}>
          <h2>Gestionar Ubicacions</h2>
          <p>Aquí pots gestionar les teves ubicacions.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('/projects/pages_netdoc/gestionar-connexions')}>
          <h2>Gestionar Connexions</h2>
          <p>Aquí pots gestionar les teves connexions.</p>
        </div>
      </div>
    </div>
  );
};
export default NetworkManagementComponent;