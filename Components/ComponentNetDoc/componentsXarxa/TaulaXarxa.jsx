import React, { useState } from 'react';


const NetworkTable = ({ networks, onEditXarxa, onDeleteXarxa }) => {

  const [selectedRow, setSelectedRow] = useState(null);


  const handleEditRowXarxa = (index) => {
    setSelectedRow(index);
    if (onEditXarxa) { // Si existeix la propietat onEditXarxa, crida a la funció
      onEditXarxa(index);
    }
  };


  const handleDeleteRowXarxa = (index) => {
    setSelectedRow(index);
    if (onDeleteXarxa) { // Si existeix la propietat onEditXarxa, crida a la funció
      onDeleteXarxa(index);
    }
  };




  return (
    <div className="network-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom de la Xarxa</th>
            <th>Descripció</th>
          </tr>
        </thead>
        <tbody>

          {networks.map((network, index) => (
            
            <tr key={index}>
              <td>{network.Id_vlan}</td>
              <td>{network.NomXarxa}</td>
              <td>{network.DescXarxa}</td>
              <td><button type='button' className='editButonXarxa' onClick={() => handleEditRowXarxa(index)}>Edita</button></td>
              <td><button type='button' className='delButonXarxa' onClick={() => handleDeleteRowXarxa(index)}>Eliminar</button></td>
            </tr>

          ))}

        </tbody>
      </table>
    </div>
  );
};

export default NetworkTable;
