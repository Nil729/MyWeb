import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const DeviceManagementForm = () => {
    const [deviceType, setDeviceType] = useState('final');
  
    const handleDeviceTypeChange = (type) => {
      setDeviceType(type);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Aquí pots gestionar l'enviament del formulari i les dades introduïdes
      // a través de l'estat del component o enviar-les a un gestor de dades
    };
  
    return (
      <div>
        <form className="device-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Gestionar Dispositius</h2>
          </div>
          <div className="device-type-selector">
            <label>
              <input
                type="radio"
                name="deviceType"
                value="final"
                checked={deviceType === 'final'}
                onChange={() => handleDeviceTypeChange('final')}
              />
              Dispositiu Final
            </label>
            <label>
              <input
                type="radio"
                name="deviceType"
                value="infra"
                checked={deviceType === 'infra'}
                onChange={() => handleDeviceTypeChange('infra')}
              />
              Dispositiu d'Infraestructura
            </label>
          </div>
          <div className="form-group">
            <label>Nom del dispositiu:</label>
            <input type="text" name="deviceName" required />
          </div>
          <div className="form-group">
            <label>IP:</label>
            <input type="text" name="ip" required />
          </div>
          <div className="form-group">
            <label>MAC:</label>
            <input type="text" name="mac" required />
          </div>
          {deviceType === 'infra' && (
            <div className="form-group">
              <label>Número de ports ethernet:</label>
              <input type="number" name="ethernetPorts" required />
            </div>
          )}
          <div className="form-group">
            <label>Ubicació:</label>
            <input type="text" name="location" required />
          </div>
          <div className="form-group">
            <label>VLAN de la xarxa:</label>
            <input type="text" name="vlan" required />
          </div>
          <div className="form-group">
            <label>Port ethernet d'entrada:</label>
            <input type="text" name="ethernetPort" required />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    );
  };
  
  export default DeviceManagementForm;