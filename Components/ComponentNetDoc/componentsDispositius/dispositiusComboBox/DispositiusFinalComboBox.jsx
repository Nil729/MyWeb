import axios from "axios";
import React, { useState, useEffect } from 'react';

const DispositiusFinalComboBox = ({ onChange, nomDispositiuFinal }) => {
    const [dispositiusFinal, setDispositiusFinal] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/dispositius/dispositiusFinal/getDispositiusFinal`);
        setDispositiusFinal(result.data);
        //{ nomDispositiuFinal: 'Dispositiu 2', deviceType: 'Infra' }, { nomDispositiuFinal: 'final_test', deviceType: 'final' }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <select name="finalDeviceName" value={nomDispositiuFinal} onChange={onChange} required>
          <option value="">Selecciona un dispositiu</option>
          {dispositiusFinal.map((dispositiuFinal, index) => (
            <option key={index} value={dispositiuFinal.nomDispositiuFinal}>
              {dispositiuFinal.nomDispositiuFinal}
            </option>
          ))}
        </select>
    );
}

export default DispositiusFinalComboBox;