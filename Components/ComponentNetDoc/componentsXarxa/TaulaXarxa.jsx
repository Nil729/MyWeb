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
            <th>Name of the Network</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>

          {networks.map((network, index) => (
            
            <tr key={index}>
              <td>{network.Vid}</td>
              <td>{network.NomXarxa}</td>
              <td>{network.DescXarxa}</td>
              <td><button type='button' className='editButonXarxa' onClick={() => handleEditRowXarxa(index)}>Edit</button></td>
              <td><button type='button' className='delButonXarxa' onClick={() => handleDeleteRowXarxa(index)}>Delete</button></td>
            </tr>

          ))}

        </tbody>
      </table>
    </div>
  );
};

export default NetworkTable;
