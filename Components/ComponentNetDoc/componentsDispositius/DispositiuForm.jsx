import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

//import { useSession, SessionProvider } from 'next-auth/react';
import isAuth from '../../IsAuth'
import TaulaDispositus from './TaulaDispositus';
import UbicacioComboBox from '../componetnsUbicacio/UbicacioComboBox';
import XarxaComboBox from '../componentsXarxa/XarxaComboBox';
import { useSession } from 'next-auth/react';
import { validateIpAddress, validateMacAddress } from '../../../utils/errorUtils';

const DeviceManagementForm = () => {
  const { data: session, status } = useSession();

  const [deviceType, setDeviceType] = useState("final");
  const [dispositius, setDispositius] = useState([

    // id_dispositu, IP, NomDispositiuDipositiu, MAC, zona_id, id_vlan, QuantitatPortsEth, descripcio_dispositiu.    
    { deviceType: deviceType, NomDispositiu: 'Dispositiu 1', ip: '192.168.1.1', mac: '00:11:22:33:44:55', port: 4, ubicacio: 'Aula 1', vlan: 1, portEntrada: 1 },
    { deviceType: deviceType, NomDispositiu: 'Dispositiu 2', ip: '192.168.1.2', mac: 'AA:BB:CC:DD:EE:FF', port: 8, ubicacio: 'Aula 2', vlan: 2, portEntrada: 1 },
    { deviceType: deviceType, NomDispositiu: 'Dispositiu 3', ip: '192.168.1.3', mac: '11:22:33:44:55:66', port: 2, ubicacio: 'Aula 3', vlan: 3, portEntrada: 1 },

  ]);

  const [selectedRowForm, setselectedRowForm] = useState(null);

  const [formValues, setFormValues] = useState({
    deviceName: '',
    ip: '',
    mac: '',
    ethernetPorts: '',
    location: '',
  });

  const [ipError, setIpError] = useState(null); // State for IP address validation error
  const [macError, setMacError] = useState(null); // State for MAC address validation error
  const [error, setError] = useState(null); // State for API errors
  // Fetch the ubicacio data on component mount
  useEffect(() => {
    fetchDispositiusData();
  }, []);

  const fetchDispositiusData = async () => {
    try {
      // Fetch ubicacio data from the API
      const response = await axios.get(`http://localhost:3002/api/netdoc/dispositius/get`);
      // Set ubicacio data state
      console.log('response', response.data);

      setDispositius(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      console: console.log('name', name, 'value', value),
    }));
  };

  const handleDeviceTypeChange = (type) => {
    setDeviceType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate the IP address
    const ipValidationResult = validateIpAddress(formValues.ip);

    if (ipValidationResult) {
      setIpError(ipValidationResult);
      return; // Don't proceed if IP is invalid
    }


    // Create a new device object with the form values
    const newDevice = {
      sessionId: session.user.id,
      deviceType: deviceType,
      NomDispositiu: formValues.deviceName,
      ip: formValues.ip,
      mac: formValues.mac,
      quantitatPortsEth: formValues.ethernetPorts || '',
      zona_id: formValues.location,
      //Id_vlan: formValues.vlan,
    };



    if (selectedRowForm === null) {
      // Add a new device
      setDispositius((prevDispositius) => [...prevDispositius, newDevice]);

      try {
        // Guardar la nova ubicacio a la base de dades
        axios.post('http://localhost:3002/api/netdoc/dispositius/insert', newDevice);
        console.log('Device added successfully', newDevice);

        // Check if the response contains an error message
        if (response.data && response.data.error) {
          setError(response.data.error);
        } else {
          // If no error in the response, reset the error state
          setError(null);
          // Add a new device
          setDispositius((prevDispositius) => [...prevDispositius, newDevice]);
          console.log('newDevice', newDevice);
        }

      }
      catch (error) {
        console.error(error);
        // if (error.response && error.response.data && error.response.data.error) {
        //   setError(error.response.data.error);
        // } else {
        //   setError('An error occurred while sending the request.');
        // }
      }

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
    });

  };

  const handleDelete = (index) => {

    if (index >= 0 && index < dispositius.length) {
      const delDispositu = dispositius[index];
      // get id dispositiu 
      try {
        // Guardar la nova ubicacio a la base de dades
        console.log('dispositius[index]', delDispositu.id_dispositiu);
        axios.post(`http://localhost:3002/api/netdoc/dispositius/delete?id_dispositiu=${delDispositu.id_dispositiu}`);;
      }
      catch (error) {
        console.error(error);
      }
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
    });
  };

  const handleEditRow = (index) => {
    if (index >= 0 && index < dispositius.length) {
      const selectedDevice = dispositius[index];
      console.log('selectedDevice', selectedDevice);
      setDeviceType(selectedDevice.deviceType); // Set the device type

      // Update the form values with the selected device data
      setFormValues({
        deviceName: selectedDevice.NomDispositiu,
        ip: selectedDevice.ip,
        mac: selectedDevice.mac,
        ethernetPorts: selectedDevice.quantitatPortsEth,
        location: selectedDevice.zona_id,
      });
      setselectedRowForm(index);
    }
  };

  const handleSaveRow = async () => {

    if (selectedRowForm !== null) {
      const updatedDispositius = [...dispositius];
      // get de id_dispositiu
      const device = dispositius[selectedRowForm];
      const id_dispositiu = device.id_dispositiu;

      updatedDispositius[selectedRowForm] = {
        sessionId: session.user.id,
        id_dispositiu: id_dispositiu,
        deviceType: deviceType,
        NomDispositiu: formValues.deviceName,
        ip: formValues.ip,
        mac: formValues.mac,
        quantitatPortsEth: formValues.ethernetPorts,
        zona_id: formValues.location,
      };

      setDispositius(updatedDispositius);
      console.log('updatedDispositius[selectedRowForm]', updatedDispositius[selectedRowForm]);
      try {
        await axios.put('http://localhost:3002/api/netdoc/dispositius/update', updatedDispositius[selectedRowForm]);
        console.log('Device updated successfully');
      } catch (error) {
        console.error('Error updating device:', error);
      }

      setselectedRowForm(null);
      setFormValues({
        deviceName: '',
        ip: '',
        mac: '',
        ethernetPorts: '',
        location: '',
      });

    }
  };

  return (
    <div className="network-form-container">
      <div className='network-form'>

        <div className="title-form">
          <h2>Gestionar Dispositius</h2>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form className="device-form" onSubmit={(e) => e.preventDefault()}>

          <div>
            <button
              className={`option-button ${deviceType === "final" ? 'selected' : ''}`}
              onClick={() => handleDeviceTypeChange("final")}
            >
              Dispositiu Final
            </button>
          </div>
          <div >
            <button
              className={`option-button ${deviceType === "Infra" ? 'selected' : ''}`}
              onClick={() => handleDeviceTypeChange("Infra")}
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
            <input
              type="text"
              name="ip"
              value={formValues.ip}
              onChange={handleChange}
              required />
            <div>
              {ipError && <span className="error-message">{ipError}</span>}
            </div>
          </div>
          <div className="form-group">
            <label>MAC:</label>
            <input type="text" name="mac" value={formValues.mac} onChange={handleChange} required />
            <div>
              {macError && <span className="error-message">{macError}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Quantitat de ports ethernet:</label>
            <input type="number" name="ethernetPorts" value={formValues.ethernetPorts} onChange={handleChange} required />
          </div>

          <UbicacioComboBox value={formValues.location} onChange={handleChange} />

          {/* <XarxaComboBox vlan={formValues.vlan} onChange={handleChange} /> */}

          <div className="form-buttons">

            {selectedRowForm !== null ? (
              <>
                <button type="button" onClick={handleSaveRow}>Guardar</button>
                <button type="reset">Neteja</button>
              </>

            ) : (
              <>
                <button type="button" onClick={handleSubmit}>Afegeix</button>
                <button type="reset">Neteja</button>
              </>
            )}

          </div>
        </form>
      </div>
      <TaulaDispositus dispositius={dispositius} onEdit={handleEditRow} onDelete={handleDelete} deviceType={deviceType} />
    </div>
  );
};

export default isAuth(DeviceManagementForm);