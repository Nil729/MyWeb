import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import TaulaDispositus from './TaulaDispositus';

const DeviceManagementForm = () => {

  const [deviceType, setDeviceType] = useState(false);

  const [dispositius, setDispositius] = useState([
    // id_dispositu, IP, NomDispositiuDipositiu, MAC, zona_id, id_vlan, QuantitatPortsEth, descripcio_dispositiu.    
    { deviceType: deviceType, NomDispositiu: 'Dispositiu 1', ip: '192.168.1.1', mac: '00:11:22:33:44:55', port: 4, ubicacio: 'Aula 1', vlan: 1, portEntrada: 1 },
    { deviceType: deviceType,  NomDispositiu: 'Dispositiu 2', ip: '192.168.1.2', mac: 'AA:BB:CC:DD:EE:FF', port: 8, ubicacio: 'Aula 2', vlan: 2, portEntrada: 1 },
    { deviceType: deviceType,  NomDispositiu: 'Dispositiu 3', ip: '192.168.1.3', mac: '11:22:33:44:55:66', port: 2, ubicacio: 'Aula 3', vlan: 3, portEntrada: 1 },
  ]);

  const [selectedRowForm, setselectedRowForm] = useState(null);

  const [formValues, setFormValues] = useState({
    deviceName: '',
    ip: '',
    mac: '',
    ethernetPorts: '',
    location: '',
    vlan: '',
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
  
    const form = event.target;
    
    // Create a new device object with the form values
    const newDevice = {
      deviceType: deviceType,
      NomDispositiu: formValues.deviceName,
      ip: formValues.ip,
      mac: formValues.mac,
      port: formValues.ethernetPorts || '',
      ubicacio: formValues.location,
      vlan: formValues.vlan,
    };
    try {
      // Guardar la nova ubicacio a la base de dades
      axios.post('http://localhost:3002/api/netdoc/dispositius/insert', newDevice);
      console.log('newDevice', newDevice);
    }
    catch (error) {
      console.error(error);
    }

    if (selectedRowForm === null) {
      // Add a new device
      setDispositius((prevDispositius) => [...prevDispositius, newDevice]);
    } else {
      // Update the existing device
      const updatedDispositius = [...dispositius];
      updatedDispositius[selectedRowForm] = newDevice;
      setDispositius(updatedDispositius);
      setselectedRowForm(null);
    }
  
    // Reset the form values
    setFormValues({
      deviceName: '',
      ip: '',
      mac: '',
      ethernetPorts: '',
      location: '',
      vlan: '',
    });

  };
  
  const handleDelete = (index) => {
    if (index >= 0 && index < dispositius.length) {
      const updatedDispositius = [...dispositius];
      updatedDispositius.splice(index, 1);
      setDispositius(updatedDispositius);
    }
    // gurada els canvis
    setselectedRowForm(null);
    setFormValues({
      deviceName: '',
      ip: '',
      mac: '',
      ethernetPorts: '',
      location: '',
      vlan: '',
    });

  };



  const handleEditRow = (index) => {
    if (index >= 0 && index < dispositius.length) {
      console.log('index', index);
      const selectedDevice = dispositius[index];
      
      setDeviceType(selectedDevice.deviceType); // Set the device type
      
      // Update the form values with the selected device data
      setFormValues({
        deviceName: selectedDevice.NomDispositiu,
        ip: selectedDevice.ip,
        mac: selectedDevice.mac,
        ethernetPorts: selectedDevice.port,
        location: selectedDevice.ubicacio,
        vlan: selectedDevice.vlan,
      });
  
      setselectedRowForm(index);
    }
  };

  const handleSaveRow = () => {

    if (selectedRowForm !== null) {
      const updatedDispositius = [...dispositius];
      updatedDispositius[selectedRowForm] = {
        NomDispositiu: formValues.deviceName,
        ip: formValues.ip,
        mac: formValues.mac,
        port: formValues.ethernetPorts || '',
        ubicacio: formValues.location,
        vlan: formValues.vlan,

      };
      setDispositius(updatedDispositius);
      setselectedRowForm(null);
      setFormValues({
        deviceName: '',
        ip: '',
        mac: '',
        ethernetPorts: '',
        location: '',
        vlan: '',
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
            className={`option-button ${deviceType === false ? 'selected' : ''}`}
            onClick={() => handleDeviceTypeChange(false)}
          >
            Dispositiu Final
          </button>
          <button
            className={`option-button ${deviceType === true ? 'selected' : ''}`}
            onClick={() => handleDeviceTypeChange(true)}
          >
            Dispositiu d'Infraestructura
          </button>
        </div>

        <div className="form-group">
          <label>Nomdel dispositiu:</label>
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

        <div className="form-group">
          <label>Quantitat de ports ethernet:</label>
          <input type="number" name="ethernetPorts" value={formValues.ethernetPorts} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Ubicació:</label>
          <input type="text" name="location" value={formValues.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>VLAN de la xarxa:</label>
          <input type="text" name="vlan" value={formValues.vlan} onChange={handleChange} required />
        </div>

        <div className="form-buttons">
          <button type="reset">Neteja</button>

          <button type="button" onClick={handleSubmit}>Afegeix</button>

          <button type="button" onClick={handleSaveRow}>Gurada</button>
        </div>
      </form>
      <TaulaDispositus dispositius={dispositius} onEdit={handleEditRow} onDelete={handleDelete} deviceType={deviceType}/>
    </div>
  );
};

export default DeviceManagementForm;