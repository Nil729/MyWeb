
/* 
    Component hon es mostrerar les diferents opcions que te l'usuari per gestionar la seva infraestructura de xarxa
    - Gestionar dispositus
    - Gestionar Xarxes
    - Gestionar Ubicacions
    - Gestionar Connexions
*/

import React from 'react';


const NetworkManagementComponent = () => {
  return (
    <div>
      <h1>Gestió de la Infraestructura de Xarxa</h1>
      <div className="card">
        <h2>Gestionar Dispositius</h2>
        <p>Aquí pots gestionar els teus dispositius.</p>
      </div>
      <div className="card">
        <h2>Gestionar Xarxes</h2>
        <p>Aquí pots gestionar les teves xarxes.</p>
      </div>
      <div className="card">
        <h2>Gestionar Ubicacions</h2>
        <p>Aquí pots gestionar les teves ubicacions.</p>
      </div>
      <div className="card">
        <h2>Gestionar Connexions</h2>
        <p>Aquí pots gestionar les teves connexions.</p>
      </div>
    </div>
  );
};

export default NetworkManagementComponent;
