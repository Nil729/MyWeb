import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

const PortsInfraComboBox = ({onChange, portInfra, nomDispositiuInfraestructura}) => {
    const [portsInfra, setPortsInfra] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(`http://localhost:3002/api/netdoc/ports/getPortsInfra?nomDipositiuInfra=${nomDispositiuInfraestructura}`);
        setPortsInfra(result.data);
    }
    
    useEffect(() => {
        if (nomDispositiuInfraestructura !== "") {
            fetchData();
        }
    }, [nomDispositiuInfraestructura]);

    return (
        
        <select name="portInfra" value={portInfra} onChange={onChange} required >
            <option value="">Selecciona un port</option>
            {portsInfra.map((portsInfra, index) => (
                <option key={index} value={portsInfra}>
                    {portsInfra}
                </option>
            ))}
        </select>

    );


}

export default PortsInfraComboBox; 