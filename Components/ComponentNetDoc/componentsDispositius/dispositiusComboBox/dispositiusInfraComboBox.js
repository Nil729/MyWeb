import axios from "axios";
import React, { useState, useEffect } from 'react';

export default DispositiusInfraComboBox = ({ onChange, value }) => {
    const [dispositiusInfra, setDispositiusInfra] = useState([]);
    const fetchData = async () => {
        const result = await axios.get('http://localhost:3002/api/netdoc/dispositius/dispositiusInfra/getDispositiusInfra');
        setDispositiusInfra(result.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="form-group">
            <label htmlFor="dispositiusInfra">Dispositius Infraestructura</label>
            <select onChange={onChange} value={value}>
                {dispositiusInfra.map((dispositiuInfra) => (
                    <option key={dispositiuInfra.NomDispositiu} value={dispositiuInfra.NomDispositiu}>
                        {dispositiuInfra.NomDispositiu}
                    </option>
                ))}
            </select>
        </div>
    );
}