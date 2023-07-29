import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

const PortsInfraComboBox = ({onChange, value, nomDispositiuInfraestructura}) => {
    const [portsInfra, setPortsInfra] = useState([]);
    console.log('Nom dis infra', nomDispositiuInfraestructura);
    const fetchData = async () => {
        const result = await axios.get('http://localhost:3002/api/netdoc/ports/getPortsInfra', nomDispositiuInfraestructura);
        setPortsInfra(result.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        
        <select name="ports Infraestructura" value={value} onChange={onChange} required >
            <option value="">Selecciona un port</option>
            {portsInfra.map((portsInfra, index) => (
                <option key={index} value={portsInfra.nomPortInfraestructura}>
                    {portsInfra.nomPortInfraestructura}
                </option>
            ))}
        </select>

    );


}

export default PortsInfraComboBox;