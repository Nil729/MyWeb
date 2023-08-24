import axios from "axios";
import React, { useState, useEffect } from 'react';

const EndPortComboBox = ({ onChange, endPort, nomDispositiuFinal}) => {

    const [endPorts, setEndPort] = useState([]);

    const [selectedEndPorts, setSelectedEndPorts] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(`http://localhost:3002/api/netdoc/ports/getPortsFinal?nomDispositiuFinal=${nomDispositiuFinal}`);
        const resultSelectedEndPorts = await axios.get(`http://localhost:3002/api/netdoc/ports/getPortsSelected?nomDipositiuInfra=${nomDispositiuFinal}`);
        setEndPort(result.data);
        setSelectedEndPorts(resultSelectedEndPorts.data);
    };

    useEffect(() => {
        if (nomDispositiuFinal !== ""){
            fetchData();
        }

    }, [nomDispositiuFinal]);

    return (
        <select name="endPort" value={endPort} onChange={onChange} required>
            <option value="">Selecciona un port final</option>
            {endPorts.map((ports, index) => (
                <option key={index} value={ports} disabled={selectedEndPorts.includes(ports)}>
                    {ports}
                </option>
            ))}
        </select>
    );
}

export default EndPortComboBox;