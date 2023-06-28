import React, { useState } from 'react';

const ConnexionsTable = ({ connexions, onEditconnexions, onDeleteconnexions }) => {

  const [selectedRow, setSelectedRow] = useState(null);


  const handleEditRowconnexions = (index) => {
    setSelectedRow(index);
    if (onEditconnexions) { // Si existeix la propietat onEditconnexions, crida a la funció
      onEditconnexions(index);
    }
  };


  const handleDeleteRowconnexions = (index) => {
    setSelectedRow(index);
    if (onDeleteconnexions) { // Si existeix la propietat onEditconnexions, crida a la funció
      onDeleteconnexions(index);
    }
  };




  return (
    <div className="connexions-table">
      <table>
        <thead>
          <tr>
            <th>Dispositiu Infrarestuctura</th>
            <th>Port Dispositiu</th>
            <th>Configuracio port</th>
            <th>Dispositiu Final</th>
            <th>Pach panel</th>
            <th>Nom de la Xarxa</th>
            <th>Descripció</th>
          </tr>
        </thead>
        <tbody>
          {connexions.map((connexions, index) => (
            <tr key={index}>
              <td>{connexions.InfraName}</td>
              <td>{connexions.descriptionConnexions}</td>
              <td><button type='button' className='editButonXarxa' onClick={() => handleEditRowconnexions(index)}>Edita</button></td>
              <td><button type='button' className='delButonXarxa' onClick={() => handleDeleteRowconnexions(index)}>Eliminar</button></td>
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConnexionsTable;
