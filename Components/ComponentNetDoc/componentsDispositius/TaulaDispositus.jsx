import React from 'react';
import { useState } from 'react';

const TaulaDispositus = ({dispositius, onEdit}) => {

  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleEdit = (index) => {
    setSelectedRow(index);
    setEditMode(true);
    if (onEdit) {
      onEdit(index);
    }
  };

  return (
    <div className="device-grid">
      <h2>Graella de Dispositius</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>IP</th>
            <th>MAC</th>
            <th>Numero Ports Ethernet</th>
            <th>Ubicació</th>
            <th>VLAN</th>
            <th>Port ethernet d'entrada</th>
          </tr>
        </thead>
        <tbody>

          {dispositius.map((dispositiu, index) => (
            <tr 
              key={index}
              className={selectedRow === index ? 'selected' : ''}
              onClick={() => handleRowClick(index)}
            >
              <td>{dispositiu.nom}</td>
              <td>{dispositiu.ip}</td>
              <td>{dispositiu.mac}</td>
              <td>{dispositiu.port}</td>
              <td>{dispositiu.ubicacio}</td>
              <td>{dispositiu.vlan}</td>
              <td>{dispositiu.portEntrada}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Editar</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaulaDispositus;
