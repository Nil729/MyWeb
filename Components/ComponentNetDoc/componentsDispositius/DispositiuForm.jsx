import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import TaulaDispositus from './TaulaDispositus';

const DeviceManagementForm = () => {

  const [editMode, setEditMode] = useState(false);

  const [deviceType, setDeviceType] = useState('final');

  const [dispositius, setDispositius] = useState([    
    { nom: 'Dispositiu 1', ip: '192.168.1.1', mac: '00:11:22:33:44:55', port: 4, ubicacio: 'Aula 1', vlan: 1, portEntrada: 1 },
    { nom: 'Dispositiu 2', ip: '192.168.1.2', mac: 'AA:BB:CC:DD:EE:FF', port: 8, ubicacio: 'Aula 2', vlan: 2, portEntrada: 1 },
    { nom: 'Dispositiu 3', ip: '192.168.1.3', mac: '11:22:33:44:55:66', port: 2, ubicacio: 'Aula 3', vlan: 3, portEntrada: 1 },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);

  const [formValues, setFormValues] = useState({
    deviceName: '',
    ip: '',
    mac: '',
    ethernetPorts: '',
    location: '',
    vlan: '',
    ethernetPort: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const handleDeviceTypeChange = (type) => {
    setDeviceType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí pots gestionar l'enviament del formulari i les dades introduïdes
    // a través de l'estat del component o enviar-les a un gestor de dades

    // Exemple d'enviament de dades amb axios
    // axios.post('/api/dispositius', formValues)
    //   .then((response) => {
    //     console.log('Dades enviades amb èxit:', response.data);
        // Aquí pots actualitzar l'estat o realitzar altres accions després de l'enviament
        const form = event.target; // Aquí pots accedir al formulari per resetejar-lo després d'enviar les dades amb èxit
        // Actualitzem la llista de dispositius amb les dades enviades
        const nouDispositiu = {
          nom: formValues.deviceName,
          ip: formValues.ip,
          mac: formValues.mac,
          port: formValues.ethernetPorts || '',
          ubicacio: formValues.location,
          vlan: formValues.vlan,
          portEntrada: formValues.ethernetPort,
        };
        setFormValues({
          deviceName: '',
          ip: '',
          mac: '',
          ethernetPorts: '',
          location: '',
          vlan: '',
          ethernetPort: '',
        });
        setDispositius((prevDispositius) => [...prevDispositius, nouDispositiu]);
      // })
      // .catch((error) => {
      //   console.error('Error en enviar les dades:', error);
      //   // Aquí pots gestionar els errors de l'enviament
      // });
      // Reseteja el formulari
      formValues.rest;

  };

  const handleDelete = () => {
    // Aquí pots gestionar l'eliminació del dispositiu
    if (selectedRow !== null) {
      const updatedDispositius = [...dispositius];
      updatedDispositius.splice(selectedRow, 1);
      setDispositius(updatedDispositius);
      setSelectedRow(null);
    }
  };


  const handleEditRow = (index) => {
    console.log('Edit row:', index);
    if (index >= 0 && index < dispositius.length) {
      const selectedDevice = dispositius[index];
      // Actualitza l'estat del dispositiu seleccionat
      console.log(selectedDevice.nom);
      // Actualitzar les dades del formulari amb les dades de la fila seleccionada
      setFormValues({
        deviceName: selectedDevice.nom,
        ip: selectedDevice.ip,
        mac: selectedDevice.mac,
        ethernetPorts: selectedDevice.port,
        location: selectedDevice.ubicacio,
        vlan: selectedDevice.vlan,
        ethernetPort: selectedDevice.portEntrada,
      });
    }
  };

  const handleSaveRow = () => {

    if (selectedRow !== null) {
      const updatedDispositius = [...dispositius];
      updatedDispositius[selectedRow] = {
        nom: formValues.deviceName,
        ip: formValues.ip,
        mac: formValues.mac,
        port: formValues.ethernetPorts || '',
        ubicacio: formValues.location,
        vlan: formValues.vlan,
        portEntrada: formValues.ethernetPort,
      };
      setDispositius(updatedDispositius);
      setSelectedRow(null);
      setFormValues({
        deviceName: '',
        ip: '',
        mac: '',
        ethernetPorts: '',
        location: '',
        vlan: '',
        ethernetPort: '',
      });
    }
  };



  
  return (
    <div className="device-management">
      <form className="device-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Gestionar Dispositius</h2>
        </div>

        <div className="device-type-selector">
          <button
            className={`option-button ${deviceType === 'final' ? 'selected' : ''}`}
            onClick={() => handleDeviceTypeChange('final')}
          >
            Dispositiu Final
          </button>
          <button
            className={`option-button ${deviceType === 'infra' ? 'selected' : ''}`}
            onClick={() => handleDeviceTypeChange('infra')}
          >
            Dispositiu d'Infraestructura
          </button>
        </div>

        <div className="form-group">
          <label>Nom del dispositiu:</label>
          <input type="text" name="deviceName" value={formValues.deviceName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>IP:</label>
          <input type="text" name="ip" value={formValues.ip} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>MAC:</label>
          <input type="text" name="mac" value={formValues.mac} onChange={handleChange} required />
        </div>
        {deviceType === 'infra' && (
          <div className="form-group">
            <label>Número de ports ethernet:</label>
            <input type="number" name="ethernetPorts" value={formValues.ethernetPorts} onChange={handleChange} required />
          </div>
        )}
        <div className="form-group">
          <label>Ubicació:</label>
          <input type="text" name="location" value={formValues.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>VLAN de la xarxa:</label>
          <input type="text" name="vlan" value={formValues.vlan} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Port ethernet d'entrada:</label>
          <input type="text" name="ethernetPort" value={formValues.ethernetPort} onChange={handleChange} required />
        </div>
        <div className="form-buttons">

          <button type="button" onClick={handleSubmit}>Afegeix</button>

          <button type="button" onClick={handleSaveRow}>Gurada</button>

          <button type="button" onClick={handleDelete}>Eliminar</button>
        </div>
      </form>
      <TaulaDispositus dispositius= {dispositius} onEdit={handleEditRow}  />
    </div>
  );
};

export default DeviceManagementForm;