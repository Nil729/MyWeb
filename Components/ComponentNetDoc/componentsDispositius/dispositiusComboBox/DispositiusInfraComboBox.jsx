import axios from "axios";
import React, { useState, useEffect } from 'react';

const DispositiusInfraComboBox = ({ onChange, nomDispositiuInfraestructura }) => {
    const [dispositiusInfra, setDispositiusInfra] = useState([]);
    
    const fetchData = async () => {
        const result = await axios.get('http://localhost:3002/api/netdoc/dispositius/dispositiusInfra/getDispositiusInfra', );
        setDispositiusInfra(result.data);
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return (

        <select name="dispositiu Infraestructura" nomDispositiuInfraestructura={nomDispositiuInfraestructura} onChange={onChange} required >
            <option nomDispositiuInfraestructura="">Selecciona un dispositiu</option>
            {dispositiusInfra.map((dispositiusInfra, index) => (
                <option key={index} nomDispositiuInfraestructura={dispositiusInfra.nomDispositiuInfraestructura}>
                    {dispositiusInfra.nomDispositiuInfraestructura}
                </option>
            ))}
        </select>

    );
}
export default DispositiusInfraComboBox;

