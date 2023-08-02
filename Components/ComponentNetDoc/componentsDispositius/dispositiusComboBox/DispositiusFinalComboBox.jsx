import axios from "axios";
import React, { useState, useEffect } from 'react';

const DispositiusInfraComboBox = ({ onChange, nomDispositiuFinal }) => {
    const [dispositiusFinal, setDispositiusFinal] = useState([]);

    const fetchData = async () => {
        const result = await axios.get('http://localhost:3002/api/netdoc/dispositius/dispositiusFinal/getDispositiusFinal');
        setDispositiusFinal(result.data);
        console.log(result.data);
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

export default DispositiusInfraComboBox;