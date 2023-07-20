import React, { useState, useEffect } from 'react';

import TaulaXarxa from './TaulaXarxa';
import axios from 'axios';


const NetworkForm = () => {
    const [networkData, setNetworkData] = useState([
        { Id_vlan: '1', NomXarxa: 'Xarxa 1', DescXarxa: 'Xarxa 1' },
    ]);

    const [selectedRowXarxaForm, setselectedRowXarxaForm] = useState(null);

    const [formvaluesXarxa, setformvaluesXarxa] = useState({

        networkId: '',
        networkName: '',
        networkDesc: '',

    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setformvaluesXarxa((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchNetworkData();
    }, []);

    const fetchNetworkData = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/netdoc/xarxa/getXarxa');
            const networkData = await response.json();
            console.log('networkData', networkData);
            setNetworkData(networkData);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const novaXarxa = {
            Id_vlan: formvaluesXarxa.networkId,
            NomXarxa: formvaluesXarxa.networkName,
            DescXarxa: formvaluesXarxa.networkDesc,
        };

        try {
            axios.post('http://localhost:3002/api/netdoc/xarxa/insertXarxa', novaXarxa);
            console.log('novaXarxa', novaXarxa);
            
            setNetworkData((prevNetworks) => [...prevNetworks, novaXarxa]);

            setformvaluesXarxa({
                networkId: '',
                networkName: '',
                networkDesc: '',
            });

        } catch (error) {
            console.error(error);
        }

    };


    const handleEditRow = (index) => {

        console.log('index', index);
        if (index >= 0 && index < networkData.length) {
            
            // Omplir els camps del formulari amb les dades de la fila seleccionada
            const formvaluesXarxa = networkData[index];
            setformvaluesXarxa({
                networkId: formvaluesXarxa.networkId,
                networkName: formvaluesXarxa.networkName,
                networkDesc: formvaluesXarxa.networkDesc,
            });


            setselectedRowXarxaForm(index);
        }
    };

    // Guardar els canvis
    const handleSaveRow = () => {
        if (selectedRowXarxaForm !== null) {
            const updatedNetworks = [...networkData];
            updatedNetworks[selectedRowXarxaForm] = {
                networkId: formvaluesXarxa.networkId,
                networkName: formvaluesXarxa.networkName,
                networkDesc: formvaluesXarxa.networkDesc,
            };
            setNetworkData(updatedNetworks);
            setselectedRowXarxaForm(null);
            setformvaluesXarxa({
                networkId: '',
                networkName: '',
                networkDesc: '',
            });
        }
    };
    
    const handleDeleteRowXarxa = async (index) => {
        // Eliminar la fila seleccionada
        const updatedNetworks = [...networkData];
        // Obtenim el id de la xarxa a eliminar

        try{

            const networkId = updatedNetworks[index].Id_vlan;
            console.log('networkId', networkId);
            
            await axios.delete('http://localhost:3002/api/netdoc/xarxa/delXarxa', networkId);
            updatedNetworks.splice(index, 1);
            setNetworkData(updatedNetworks);
            // gurada els canvis
            setselectedRowXarxaForm(null);
            setformvaluesXarxa({
                networkId: '',
                networkName: '',
                networkDesc: '',
            });

        } catch (error) {
            console.error(error);
        }

    };


    return (
        <div className="network-form-container">
            <div className="network-form">
                <h2 className='title-form'>Formulari de Xarxa</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="networkId">ID de la Xarxa:</label>
                        <input
                            type="text"
                            id="networkId"
                            name="networkId"
                            value={formvaluesXarxa.networkId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="networkName">Nom de la Xarxa:</label>
                        <input
                            type="text"
                            id="networkName"
                            name="networkName"
                            value={formvaluesXarxa.networkName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="networkDesc">Descripció:</label>
                        <textarea
                            id="networkDesc"
                            name="networkDesc"
                            value={formvaluesXarxa.networkDesc}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" >Afegeix</button>

                        <button type='button' onClick={handleSaveRow} >Guardar</button>
                    </div>
                </form>
            </div>
            <TaulaXarxa networks={networkData} onEditXarxa={handleEditRow} onDeleteXarxa= {handleDeleteRowXarxa} />
        </div>
    );
};


export default NetworkForm;
