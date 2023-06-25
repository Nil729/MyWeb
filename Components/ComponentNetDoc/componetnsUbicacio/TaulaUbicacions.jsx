import React, { useState } from 'react';

const UbicacionsTable = ({ ubicacio, onEditUbicacio, onDeleteUbicacio }) => {

  const [selectedRow, setSelectedRow] = useState(null);


  const handleEditRowUbicacio = (index) => {
    setSelectedRow(index);
    if (onEditUbicacio) { // Si existeix la propietat onEditUbicacio, crida a la funció
      onEditUbicacio(index);
    }
  };


  const handleDeleteRowUbicacio = (index) => {
    setSelectedRow(index);
    if (onDeleteUbicacio) { // Si existeix la propietat onEditUbicacio, crida a la funció
      onDeleteUbicacio(index);
    }
  };




  return (
    <div className="ubicacio-table">
      <table>
        <thead>
          <tr>
            <th>Nom de la Xarxa</th>
            <th>Descripció</th>
          </tr>
        </thead>
        <tbody>
          {ubicacio.map((ubicacio, index) => (

            <tr key={index}>
              <td>{ubicacio.ubicacioName}</td>
              <td>{ubicacio.descriptionUbicacio}</td>
              <td><button type='button' className='editButonXarxa' onClick={() => handleEditRowUbicacio(index)}>Edita</button></td>
              <td><button type='button' className='delButonXarxa' onClick={() => handleDeleteRowUbicacio(index)}>Eliminar</button></td>
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UbicacionsTable;
