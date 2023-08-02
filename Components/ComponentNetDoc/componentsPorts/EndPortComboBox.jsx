import axios from "axios";
import React, { useState, useEffect } from 'react';

const EndPortComboBox = ({ onChange, endPortNum, nomDispositiuFinal}) => {
    const [endPorts, setEndPort] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(`http://localhost:3002/api/netdoc/ports/getPortsFinal?nomDispositiuFinal=${nomDispositiuFinal}`);
        setEndPort(result.data);
    };

    useEffect(() => {
        if (nomDispositiuFinal !== ""){
            fetchData();
        }

    }, [nomDispositiuFinal]);

    return (
        <select name="endPort" value={endPortNum} onChange={onChange} required>
            <option value="">Selecciona un port final</option>
            {endPorts.map((endPort, index) => (
                <option key={index} value={endPort}>
                    {endPort}
                </option>
            ))}
        </select>
    );
}

export default EndPortComboBox;