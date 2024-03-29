import axios from "axios";
import React, { useState, useEffect } from 'react';

const DispositiusInfraComboBox = ({ onChange, nomDispositiuInfraestructura }) => {
    const [dispositiusInfra, setDispositiusInfra] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/dispositius/dispositiusInfra/getDispositiusInfra`);
        setDispositiusInfra(result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <select name="infraDeviceName" value={nomDispositiuInfraestructura} onChange={onChange} required>
            <option value="">Select a device</option>
            {dispositiusInfra.map((dispositiuInfra, index) => (
                <option key={index} value={dispositiuInfra.nomDispositiuInfraestructura}>
                    {dispositiuInfra.nomDispositiuInfraestructura}
                </option>
            ))}
        </select>
    );
};

export default DispositiusInfraComboBox;
