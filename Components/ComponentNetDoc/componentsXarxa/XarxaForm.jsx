import React, { useState, useEffect } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
import TaulaXarxa from './TaulaXarxa';
import axios from 'axios';

const NetworkForm = () => {
    const { data: session, status } = useSession();
    const [error, setError] = useState(null);
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


    const handleSubmit = async (event) => {
        
        event.preventDefault();

        const novaXarxa = {
            sessionId: session.user.id,
            Id_vlan: formvaluesXarxa.networkId,
            NomXarxa: formvaluesXarxa.networkName,
            DescXarxa: formvaluesXarxa.networkDesc,
        };

        try {
            
            const response = await axios.post('http://localhost:3002/api/netdoc/xarxa/insertXarxa', novaXarxa);
            console.log('novaXarxa', novaXarxa);

            if (response.data && response.data.error) {
                setError(response.data.error);

            } else {
                setError(null);
                // Guardar la nova ubicacio a la 
                setNetworkData((prevNetworks) => [...prevNetworks, novaXarxa]);
            }

        } catch (error) {
            console.log('error', error);
            // Handle network errors or unexpected errors here
            if (error.response && error.response.data && error.response.data.error) {
              // Extract the specific error message from the response and set it as an error
              setError(error.response.data.error);
            } else {
              // Set a generic error message
              setError('An error occurred while sending the request.');
            }
        }

        setformvaluesXarxa({
            networkId: '',
            networkName: '',
            networkDesc: '',
        });

    };

    const handleEditRow = (index) => {

        console.log('index', index);
        if (index >= 0 && index < networkData.length) {

            // Omplir els camps del formulari amb les dades de la fila seleccionada
            const formvaluesXarxa = networkData[index];

            setformvaluesXarxa({
                networkId: formvaluesXarxa.Id_vlan,
                networkName: formvaluesXarxa.NomXarxa,
                networkDesc: formvaluesXarxa.DescXarxa,
            });

            setselectedRowXarxaForm(index);
        }
    };

    // Guardar els canvis
    const handleSaveRow = () => {
        
        if (selectedRowXarxaForm !== null) {
            const updatedNetworks = [...networkData];

            updatedNetworks[selectedRowXarxaForm] = {
                Id_vlan: formvaluesXarxa.networkId,
                NomXarxa: formvaluesXarxa.networkName,
                DescXarxa: formvaluesXarxa.networkDesc
            };
            setNetworkData(updatedNetworks);
            try {

                axios.put('http://localhost:3002/api/netdoc/xarxa/updateXarxa', updatedNetworks[selectedRowXarxaForm]);
                console.log('updatedNetworks[selectedRowXarxaForm]', updatedNetworks[selectedRowXarxaForm]);

            } catch (error) {
                console.error(error);
            }
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

        const networkId = updatedNetworks[index].Id_vlan;
        console.log('networkId', networkId);

        try {

            await axios.delete(`http://localhost:3002/api/netdoc/xarxa/delXarxa?networkId=${networkId}`);
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

    const handleCancelRow = () => {
        setselectedRowXarxaForm(null);
        setformvaluesXarxa({
            networkId: '',
            networkName: '',
            networkDesc: '',
        });
    };

    return (
        <div className="network-form-container">
            <div className="network-form">
                <div>
                    <h2 className='title-form'>Formulari de Xarxa</h2>
                </div>
                <div className="error-message">{error}</div>
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
                        {selectedRowXarxaForm !== null ? (
                            <>
                                <button type='button' onClick={handleSaveRow} >Guardar</button>
                                <button type='button' onClick={handleCancelRow} >Cancel·lar</button>
                            </>
                        ) : (

                            <>
                                <button type="submit" >Afegeix</button>
                                <button type='button' onClick={handleCancelRow} >Cancel·lar</button>
                            </>
                        )}
                    </div>
                </form>
            </div>
            <TaulaXarxa networks={networkData} onEditXarxa={handleEditRow} onDeleteXarxa={handleDeleteRowXarxa} />
        </div>
    );
};


export default NetworkForm;
