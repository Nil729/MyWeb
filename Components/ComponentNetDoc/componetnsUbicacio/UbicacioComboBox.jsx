import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UbicacioComboBox = ({ value, onChange }) => {
  const [ubicacions, setUbicacions] = useState([]);

  useEffect(() => {
    const fetchUbicacions = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/ubicacions`);
        const ubicacions = response.data.map((ubicacio) => ubicacio.ubicacioName);
        setUbicacions(ubicacions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUbicacions();
  }, []);

  return (
    <div className="form-group">
      <label>Location:</label>
      <select name="location" value={value} onChange={onChange} required>
        <option value="">Select a location</option>
        {ubicacions.map((ubicacio, index) => (
          <option key={index} value={ubicacio}>
            {ubicacio}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UbicacioComboBox;