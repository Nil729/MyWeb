import axios from "axios";
import React, { useState, useEffect } from 'react';

const DispositiusInfraComboBox = ({ onChange, value }) => {
    const [dispositiusInfra, setDispositiusInfra] = useState([]);
    
    const fetchData = async () => {
        const result = await axios.get('http://localhost:3002/api/netdoc/dispositius/dispositiusInfra/getDispositiusInfra');
        setDispositiusInfra(result.data);
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return (

        <select name="dispositiu Infraestructura" value={value} onChange={onChange} required >
            <option value="">Selecciona un dispositiu</option>
            {dispositiusInfra.map((dispositiusInfra, index) => (
                <option key={index} value={dispositiusInfra.nomDispositiuInfraestructura}>
                    {dispositiusInfra.nomDispositiuInfraestructura}
                </option>
            ))}
        </select>

    );
}
export default DispositiusInfraComboBox;