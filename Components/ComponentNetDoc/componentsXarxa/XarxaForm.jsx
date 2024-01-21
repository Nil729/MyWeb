import React, { useState, useEffect } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
import TaulaXarxa from './TaulaXarxa';
import axios from 'axios';
//import LayautSidebar from '../SideBarNetDoc/LayautSidebar';


const NetworkForm = () => {
    const { data: session, status } = useSession();
    const [error, setError] = useState(null);
    const [networkData, setNetworkData] = useState([]);

    const [selectedRowXarxaForm, setselectedRowXarxaForm] = useState(null);

    const [formvaluesXarxa, setformvaluesXarxa] = useState({

        networkUserId: '',
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/xarxa/getXarxa`);
            const networkData = await response.json();
            setNetworkData(networkData);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        const novaXarxa = {
            sessionId: session.user.id,
            Vid: formvaluesXarxa.networkUserId,
            NomXarxa: formvaluesXarxa.networkName,
            DescXarxa: formvaluesXarxa.networkDesc,
        };

        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/xarxa/insertXarxa`, novaXarxa);

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
            networkUserId: '',
            networkName: '',
            networkDesc: '',
        });

    };

    const handleEditRow = (index) => {

        if (index >= 0 && index < networkData.length) {

            // Omplir els camps del formulari amb les dades de la fila seleccionada
            const formvaluesXarxa = networkData[index];

            setformvaluesXarxa({
                networkUserId: formvaluesXarxa.Vid,
                networkName: formvaluesXarxa.NomXarxa,
                networkDesc: formvaluesXarxa.DescXarxa,
            });

            setselectedRowXarxaForm(index);
        }
    };

    // Guardar els canvis
    const handleSaveRow = async () => {

        if (selectedRowXarxaForm !== null) {
            const updatedNetworks = [...networkData];

            updatedNetworks[selectedRowXarxaForm] = {
                Id_vlan: networkData[selectedRowXarxaForm].Id_vlan,
                Vid: formvaluesXarxa.networkUserId,
                NomXarxa: formvaluesXarxa.networkName,
                DescXarxa: formvaluesXarxa.networkDesc
            };

            try {

                const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/xarxa/updateXarxa`, updatedNetworks[selectedRowXarxaForm]);

                if (response.data && response.data.error) {
                    setError(response.data.error);
                } else {
                    setError(null);
                    // Guardar la nova ubicacio a la 
                    setNetworkData(updatedNetworks);
                }


            } catch (error) {
                console.log('error', error);
                // Handle network errors or unexpected errors here
                if (error.response && error.response.data && error.response.data.error) {
                    // Extract the specific error message from the response and set it as an error
                    setError(error.response.data.error.sqlMessage);
                } else {
                    // Set a generic error message
                    setError('An error occurred while sending the request.');
                }
            }
            setselectedRowXarxaForm(null);

            setformvaluesXarxa({
                networkUserId: '',
                networkName: '',
                networkDesc: '',
            });
        }
    };

    const handleDeleteRowXarxa = async (index) => {
        // Eliminar la fila seleccionada
        const updatedNetworks = [...networkData];
        // Obtenim el id de la xarxa a eliminar
        const xarxaId = networkData[index].Id_vlan;
        try {

            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/xarxa/delXarxa?xarxaId=${xarxaId}`);
            updatedNetworks.splice(index, 1);
            setNetworkData(updatedNetworks);
            // gurada els canvis
            setselectedRowXarxaForm(null);
            setformvaluesXarxa({
                networkUserId: '',
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
            networkUserId: '',
            networkName: '',
            networkDesc: '',
        });
    };

    return (

        <div className="network-form-container">

            <div className="network-form">
                <div>
                    <h2 className='title-form'>Networks</h2>
                </div>
                <div className="error-message">{error}</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="networkUserId">Network ID:</label>
                        <input
                            type="text"
                            id="networkUserId"
                            name="networkUserId"
                            value={formvaluesXarxa.networkUserId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="networkName">Network name:</label>
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
                        <label htmlFor="networkDesc">Description:</label>
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
                                <button type='button' onClick={handleSaveRow} >Save</button>
                                <button type='button' onClick={handleCancelRow} >Cancel</button>
                            </>
                        ) : (

                            <>
                                <button type="submit" >Add</button>
                                <button type='button' onClick={handleCancelRow} >Cancel</button>
                            </>
                        )}
                    </div>
                </form>
            </div>
            <TaulaXarxa networks={networkData} onEditXarxa={handleEditRow} onDeleteXarxa={handleDeleteRowXarxa} />
        </div >
    );
};


export default NetworkForm;
