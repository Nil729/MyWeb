import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const PortsInfraComboBox = ({ onChange, portInfra, nomDispositiuInfraestructura }) => {

    const [portsInfra, setPortsInfra] = useState([]);
    const [selectedPorts, setSelectedPorts] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(`http://localhost:3002/api/netdoc/ports/getPortsInfra?nomDipositiuInfra=${nomDispositiuInfraestructura}`);
        const resultSelectedPorts = await axios.get(`http://localhost:3002/api/netdoc/ports/getPortsSelected?nomDipositiuInfra=${nomDispositiuInfraestructura}`);
        console.log(result.data);
        setPortsInfra(result.data);
        setSelectedPorts(resultSelectedPorts.data);
    }

    console.log(selectedPorts);

    useEffect(() => {
        if (nomDispositiuInfraestructura !== "") {
            fetchData();
        }
    }, [nomDispositiuInfraestructura]);

    return (
        <select name="portInfra" value={portInfra} onChange={onChange} required>
            <option value="">Selecciona un port</option>
            {portsInfra.map((port, index) => (
                <option
                    key={index}
                    value={port}
                    disabled={selectedPorts.includes(port)}
                >
                    {port}
                </option>
            ))}
        </select>
    );
}

export default PortsInfraComboBox;
