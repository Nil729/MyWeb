import axios from "axios";
import React, { useState, useEffect } from 'react';

const EndPortComboBox = ({ onChange, endPort, nomDispositiuFinal}) => {

    const [endPorts, setEndPort] = useState([]);

    const [selectedEndPorts, setSelectedEndPorts] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/ports/getPortsFinal?nomDispositiuFinal=${nomDispositiuFinal}`);
        const resultSelectedEndPorts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/ports/getPortsSelected?nomDipositiuInfra=${nomDispositiuFinal}`);
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
            <option value="">Select an end port</option>
            {endPorts.map((ports, index) => (
                <option key={index} value={ports} disabled={selectedEndPorts.includes(ports)}>
                    {ports}
                </option>
            ))}
        </select>
    );
}

export default EndPortComboBox;