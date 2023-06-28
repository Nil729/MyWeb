import React, { useState } from 'react';

const ConnexionsTable = ({ connexions, onEditConnexions, onDeleteConnexions }) => {

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };
  
  const handleEditRowconnexions = (index) => {
    setSelectedRow(index);
    // Si existeix la propietat onEditconnexions, crida a la funció
    if (onEditConnexions)
      console.log('Edita la fila: ', index);
      onEditConnexions(index);
    
  };


  const handleDeleteRowconnexions = (index) => {
    setSelectedRow(index);
    if (onDeleteConnexions) { // Si existeix la propietat onEditconnexions, crida a la funció
      onDeleteConnexions(index);
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
            <tr 
              key={index}
              className={selectedRow === index ? 'selected' : ''}
              onClick={() => handleRowClick(index)}
            >
              <td>{connexions.InfraName}</td>
              <td>{connexions.portInfra}</td>
              <td>{connexions.portStatus}</td>
              <td>{connexions.finalDeviceName}</td>
              <td>{connexions.pachpanelName}</td>
              <td>{connexions.xarxaName}</td>
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
