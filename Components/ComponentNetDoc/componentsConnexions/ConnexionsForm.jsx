import React, { useEffect, useState } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';

import ConnexionsTable from './TaulaConnexions';
import DispositiusInfraComboBox from '../componentsDispositius/dispositiusComboBox/DispositiusInfraComboBox';
import PortsInfraComboBox from '../componentsPorts/PortsInfraComboBox';
import DispositiusFinalComboBox from '../componentsDispositius/dispositiusComboBox/DispositiusFinalComboBox';
import EndPortComboBox from '../componentsPorts/EndPortComboBox.jsx';
import XarxaComboBox from '../componentsXarxa/XarxaComboBox';
import XarxaSelectBox from '../componentsXarxa/XarxaSelectBox';
import XarxaSelectDefaul from '../componentsXarxa/XarxaSelectDefaul';
//import Example from './Example';
import axios from 'axios';


const ConnexionsForm = () => {
    const { data: session, status } = useSession();

    const [connexionsData, setconnexionsData] = useState([]);

    const [selectedRowConnexionsForm, setselectedRowUbiacioForm] = useState(null);

    const [formvaluesConnexions, setformvaluesConnexions] = useState({
        infraDeviceName: '',
        portInfra: '',
        portStatus: 'undefined',
        finalDeviceName: '',
        endPort: '',
        pachpanelName: 'test',
        vlan: 'Undefined network',
        descriptionConnexions: 'test',
        sessionId: session.user.id,
    });


    const handleChange = (event) => {

        const { name, value } = event.target;

        setformvaluesConnexions((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(
                `${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/connexions/getConnexions`,
            );
            setconnexionsData(response.data);
        };
        fetchData();

    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        const novaConnexions = {
            infraDeviceName: formvaluesConnexions.infraDeviceName,
            portInfra: formvaluesConnexions.portInfra,
            portStatus: formvaluesConnexions.portStatus,
            finalDeviceName: formvaluesConnexions.finalDeviceName,
            endPort: formvaluesConnexions.endPort,
            //pachpanelName: formvaluesConnexions.pachpanelName,
            vlan: formvaluesConnexions.vlan ? formvaluesConnexions.vlan : 'Undefined network',
            //descriptionConnexions: formvaluesConnexions.descriptionConnexions,
            sessionId: session.user.id,

        };

        setconnexionsData((prevConnexions) => [...prevConnexions, novaConnexions]);

        try {

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/connexions/insertConnexio`, novaConnexions);
        } catch (error) {
            console.error(error);
        }

        setselectedRowUbiacioForm(null);
        setformvaluesConnexions({
            infraDeviceName: '',
            portInfra: '',
            portStatus: '',
            finalDeviceName: '',
            endPort: '',
            pachpanelName: '',
            vlan: '',
            descriptionConnexions: '',
        });
    };


    const handleEditRowConnexions = (index) => {
        // Omplir els camps del formulari amb les dades de la fila seleccionada
        const formvaluesConnexions = connexionsData[index];
        setformvaluesConnexions({
            infraDeviceName: formvaluesConnexions.infraDeviceName,
            portInfra: formvaluesConnexions.portInfra,
            portStatus: formvaluesConnexions.portStatus,
            finalDeviceName: formvaluesConnexions.finalDeviceName,
            endPort: formvaluesConnexions.endPort,
            //pachpanelName: formvaluesConnexions.pachpanelName,
            vlan: formvaluesConnexions.vlan,
            //descriptionConnexions: formvaluesConnexions.descriptionConnexions,
        });
        setselectedRowUbiacioForm(index);
    };

    // Guardar els canvis
    const handleSaveRow = () => {
        if (selectedRowConnexionsForm !== null) {
            const updatedConnexions = [...connexionsData];
            updatedConnexions[selectedRowConnexionsForm] = {
                idConneccio: connexionsData[selectedRowConnexionsForm].idConneccio,
                infraDeviceName: formvaluesConnexions.infraDeviceName,
                portInfra: formvaluesConnexions.portInfra,
                portStatus: formvaluesConnexions.portStatus,
                finalDeviceName: formvaluesConnexions.finalDeviceName,
                endPort: formvaluesConnexions.endPort,
                //pachpanelName: formvaluesConnexions.pachpanelName,
                vlan: formvaluesConnexions.vlan,//formvaluesConnexions.vlan.split(', '), // convertir a array 
                //descriptionConnexions: formvaluesConnexions.descriptionConnexions,
                sessionId: session.user.id,
            };
            setconnexionsData(updatedConnexions);

            try {
                axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/connexions/updateConnexions`, updatedConnexions[selectedRowConnexionsForm]);
            } catch (error) {
                console.error(error);
            }

            setselectedRowUbiacioForm(null);

            setformvaluesConnexions({
                infraDeviceName: '',
                portInfra: '',
                portStatus: '',
                finalDeviceName: '',
                endPort: '',
                //pachpanelName: '',
                vlan: '',
                //descriptionConnexions: '',
            });
        }
    };

    const handleDeleteRowConnexions = (index) => {
        // Eliminar la fila seleccionada
        const updatedConnexions = [...connexionsData];
        const delconn = updatedConnexions[index];
        const sessionId = session.user.id;

        //console.log('Delete connexio: ', delconn.idConneccio, ' - ', delconn.infraDeviceName, ' - ', delconn.portInfra, ' - ', delconn.portStatus, ' - ', delconn.finalDeviceName, ' - ', delconn.endPort,  ' - ', delconn.vlan, ' - ', sessionId);
        try {
            axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/connexions/deleteConnexio?idConneccio=${delconn.idConneccio}&infraDeviceName=${delconn.infraDeviceName}&finalDeviceName=${delconn.finalDeviceName}&sessionId=${sessionId}`);
        } catch (error) {
            console.error(error);
        }

        updatedConnexions.splice(index, 1);

        setconnexionsData(updatedConnexions);

        // gurada els canvis
        setselectedRowUbiacioForm(null);
        setformvaluesConnexions({
            infraDeviceName: '',
            portInfra: '',
            portStatus: '',
            finalDeviceName: '',
            endPort: '',
            pachpanelName: '',
            vlan: '',
            descriptionConnexions: '',
        });
    };

    // function of cancel edit row:
    const handleCancelEditRow = () => {
        setselectedRowUbiacioForm(null);
        setformvaluesConnexions({
            infraDeviceName: '',
            portInfra: '',
            portStatus: '',
            finalDeviceName: '',
            endPort: '',
            pachpanelName: '',
            vlan: '',
            descriptionConnexions: '',
        });
    };



    return (
        <div className="network-form-container">

            <div className="network-form">
                <h2 className='title-form'>Connections</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="infraDeviceName">Infrastructure device:</label>
                        <DispositiusInfraComboBox
                            onChange={handleChange}
                            nomDispositiuInfraestructura={formvaluesConnexions.infraDeviceName} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="portInfra">Port infrastructure:</label>
                        <PortsInfraComboBox
                            onChange={handleChange}
                            portInfra={formvaluesConnexions.portInfra}
                            nomDispositiuInfraestructura={formvaluesConnexions.infraDeviceName}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="config-Port">Port configuration:</label>
                        {/* Radio buttons: Tagged */}
                        <div>
                            <input type="radio" id="tagged" name="portStatus" value="tagged"
                                checked={formvaluesConnexions.portStatus === "tagged"}
                                onChange={handleChange}
                            />
                            <label htmlFor="tagged">Tagged</label>
                        </div>
                        {/* Radio buttons: Untagged */}
                        <div>
                            <input type="radio" id="untagged" name="portStatus" value="untagged"
                                checked={formvaluesConnexions.portStatus === "untagged"}
                                onChange={handleChange}
                            />
                            <label htmlFor="untagged">Untagged</label>
                        </div>
                        {/* Radio buttons: Undefined  set defaul value Undefined network */}
                        <div>
                            <input type="radio" id="undefined" name="portStatus" value="undefined"
                                checked={formvaluesConnexions.portStatus === "undefined"}
                                onChange={handleChange} />
                            <label htmlFor="undefined">Undefined</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="finalDeviceName">Endpoint:</label>
                        <DispositiusFinalComboBox
                            onChange={handleChange}
                            nomDispositiuFinal={formvaluesConnexions.finalDeviceName}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="endPort">End port:</label>
                        <EndPortComboBox
                            onChange={handleChange}
                            endPort={formvaluesConnexions.endPort}
                            nomDispositiuFinal={formvaluesConnexions.finalDeviceName}
                        />
                    </div>

                    {/* Si el estado de vlan es tagge puede seleccionar una o multiples vlan si untagged, se debe seleccionar una vlan. Si el estado es undefined, no se debe seleccionar ninguna vlan. 
                    <XarxaSelectBox vlan={formvaluesConnexions.vlan} onChange={handleChange} />
                    */}
                    {formvaluesConnexions.portStatus === 'untagged' ? (
                        <>
                            <XarxaComboBox
                                vlan={formvaluesConnexions.vlan}
                                onChange={handleChange}
                                nomDispositiuInfraestructura={formvaluesConnexions.infraDeviceName}
                                portInfra={formvaluesConnexions.portInfra}
                            />
                        </>

                    ) : formvaluesConnexions.portStatus === 'tagged' ? (
                        <>
                            <XarxaSelectBox
                                vlan={formvaluesConnexions.vlan}
                                onChange={handleChange}
                                nomDispositiuInfraestructura={formvaluesConnexions.infraDeviceName}
                                portInfra={formvaluesConnexions.portInfra}
                            />
                        </>
                    ) : formvaluesConnexions.portStatus === 'undefined' ? (
                        // set default vlan value Undefined network: vlan = 'Undefined network'
                        <>
                            <XarxaSelectDefaul
                                vlan={formvaluesConnexions.vlan}
                            />
                        </>


                    ) : null

                    }
                    {/*
                    <div className="form-group">
                        <label htmlFor="pachpanelName">Nom pachpanel:</label>
                        <input
                            type="text"
                            id="pachpanelName"
                            name="pachpanelName"
                            value={"test"}
                            //value={formvaluesConnexions.pachpanelName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descriptionConnexions">Descripció de la connexio:</label>
                        <textarea
                            id="descriptionConnexions"
                            name="descriptionConnexions"
                            value={formvaluesConnexions.descriptionConnexions}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    */}

                    <div className="form-group">
                        {selectedRowConnexionsForm !== null ? (
                            <>
                                <button type="button" onClick={handleSaveRow}>Save</button>
                                <button type="button" onClick={handleCancelEditRow}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button type="submit">Connect</button>
                                <button type="button" onClick={handleCancelEditRow}>Cancel</button>
                            </>
                        )}
                    </div>
                </form>
            </div>



            <ConnexionsTable connexions={connexionsData} onEditConnexions={handleEditRowConnexions} onDeleteConnexions={handleDeleteRowConnexions} />
        </div>
    );
};


export default ConnexionsForm;