import axios from 'axios';
import React, { useState, useEffect } from 'react';

const XarxaComboBox = ({ value, onChange }) => {
  const [xarxa, setxarxa] = useState([]);

  useEffect(() => {
    const fetchxarxa = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/netdoc/xarxa/getXarxa');
        const xarxa = response.data.map((xarxa) => xarxa.NomXarxa);
        console.log('xarxa', xarxa);
        setxarxa(xarxa);
      } catch (error) {
        console.error(error);
      }
    };

    fetchxarxa();
  }, []);

  return (
    <div className="form-group">
      <label>Xarxa:</label>
      <select name="vlan" value={value} onChange={onChange} required>
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