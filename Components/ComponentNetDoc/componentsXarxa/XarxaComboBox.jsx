
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const XarxaComboBox = ({ vlan, onChange, nomDispositiuInfraestructura, portInfra }) => {

  const [xarxa, setXarxa] = useState([]);

  useEffect(() => {
    const fetchxarxa = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/xarxa/getXarxaFromPortInfra?nomDispositiuInfraestructura=${nomDispositiuInfraestructura}&portInfra=${portInfra}`);
        const xarxa = response.data.map((xarxa) => xarxa.NomXarxa);

        setXarxa(xarxa);
      } catch (error) {
        console.error(error);
      }
    };

    fetchxarxa();
  }, [nomDispositiuInfraestructura]);

  return (
    <div className="form-group">
      <label>Xarxa:</label>
      <select name="vlan" value={vlan} onChange={onChange} required>
        <option value="">Selecciona una xarxa</option>
        {xarxa.map((xarxa, index) => (
          <option key={index} value={xarxa}>
            {xarxa}
          </option>
        ))}
      </select>
    </div>
  );
};


export default XarxaComboBox;


