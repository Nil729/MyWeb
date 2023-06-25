import React, { useState } from 'react';

import TaulaXarxa from './TaulaXarxa';


const NetworkForm = () => {
    const [networkData, setNetworkData] = useState([]);

    const [selectedRowXarxaForm, setselectedRowXarxaForm] = useState(null);

    const [formvaluesXarxa, setformvaluesXarxa] = useState({
        networkId: '',
        networkName: '',
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setformvaluesXarxa((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const novaXarxa = {
            networkId: formvaluesXarxa.networkId,
            networkName: formvaluesXarxa.networkName,
            description: formvaluesXarxa.description,
        };

        setNetworkData((prevNetworks) => [...prevNetworks, novaXarxa]);

        setformvaluesXarxa({
            networkId: '',
            networkName: '',
            description: '',
        });
    };


    const handleEditRow = (index) => {
        console.log('index', index);
        if (index >= 0 && index < networkData.length) {
            
            // Omplir els camps del formulari amb les dades de la fila seleccionada
            const formvaluesXarxa = networkData[index];
            setformvaluesXarxa({
                networkId: formvaluesXarxa.networkId,
                networkName: formvaluesXarxa.networkName,
                description: formvaluesXarxa.description,
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
                description: formvaluesXarxa.description,
            };
            setNetworkData(updatedNetworks);
            setselectedRowXarxaForm(null);
            setformvaluesXarxa({
                networkId: '',
                networkName: '',
                description: '',
            });
        }
    };
    
    const handleDeleteRowXarxa = (index) => {
        // Eliminar la fila seleccionada
        const updatedNetworks = [...networkData];
        updatedNetworks.splice(index, 1);
        setNetworkData(updatedNetworks);
        // gurada els canvis
        setselectedRowXarxaForm(null);
        setformvaluesXarxa({
            networkId: '',
            networkName: '',
            description: '',
        });

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
                        <label htmlFor="description">Descripció:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formvaluesXarxa.description}
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
