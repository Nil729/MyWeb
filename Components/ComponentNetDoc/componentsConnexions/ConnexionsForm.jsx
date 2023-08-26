import React, { useEffect, useState } from 'react';

import ConnexionsTable from './TaulaConnexions';
import DispositiusInfraComboBox from '../componentsDispositius/dispositiusComboBox/DispositiusInfraComboBox';
import PortsInfraComboBox from '../componentsPorts/PortsInfraComboBox';
import DispositiusFinalComboBox from '../componentsDispositius/dispositiusComboBox/DispositiusFinalComboBox';
import EndPortComboBox from '../componentsPorts/EndPortComboBox.jsx';
import XarxaComboBox from '../componentsXarxa/XarxaComboBox';
import XarxaSelectBox from '../componentsXarxa/XarxaSelectBox';
//import Example from './Example';
import axios from 'axios';

const ConnexionsForm = () => {

    const [connexionsData, setconnexionsData] = useState([]);

    const [selectedRowConnexionsForm, setselectedRowUbiacioForm] = useState(null);

    const [formvaluesConnexions, setformvaluesConnexions] = useState({
        infraDeviceName: '',
        portInfra: '',
        portStatus: '',
        finalDeviceName: '',
        endPort: '',
        pachpanelName: '',
        vlan: '',
        descriptionConnexions: '',
    });


    const handleChange = (event) => {
        console.log(event.target)
        const { name, value } = event.target;
        console: console.log('name: ', name, 'value: ', value),
            setformvaluesConnexions((prevValues) => ({
                ...prevValues,
                [name]: value,
                console: console.log('name: ', name, 'value: ', value),
            }));
        console.log('formvaluesConnexions: ', formvaluesConnexions);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios(
                'http://localhost:3002/api/netdoc/connexions/getConnexions',
            );
            console.log('response.data: ', response.data);
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
            pachpanelName: formvaluesConnexions.pachpanelName,
            vlan: formvaluesConnexions.vlan,
            descriptionConnexions: formvaluesConnexions.descriptionConnexions,
        };

        setconnexionsData((prevConnexions) => [...prevConnexions, novaConnexions]);

        console.log('novaConnexions: ', novaConnexions);
        try {

            axios.post('http://localhost:3002/api/netdoc/connexions/insertConnexio', novaConnexions);
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
            pachpanelName: formvaluesConnexions.pachpanelName,
            vlan: formvaluesConnexions.vlan,
            descriptionConnexions: formvaluesConnexions.descriptionConnexions,

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
                pachpanelName: formvaluesConnexions.pachpanelName,
                vlan: formvaluesConnexions.vlan.split(', '), // convertir a array 
                descriptionConnexions: formvaluesConnexions.descriptionConnexions,
            };
            setconnexionsData(updatedConnexions);

            console.log('updatedConnexions: ', updatedConnexions[selectedRowConnexionsForm]);
            try {
                axios.put('http://localhost:3002/api/netdoc/connexions/updateConnexions', updatedConnexions[selectedRowConnexionsForm]);
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
        }
    };

    const handleDeleteRowConnexions = (index) => {
        // Eliminar la fila seleccionada
        const updatedConnexions = [...connexionsData];
        const delconn = updatedConnexions[index];

        console.log('Delete connexio: ', delconn.idConneccio, ' - ', delconn.infraDeviceName, ' - ', delconn.portInfra, ' - ', delconn.portStatus, ' - ', delconn.finalDeviceName, ' - ', delconn.endPort, ' - ', delconn.pachpanelName, ' - ', delconn.vlan, ' - ', delconn.descriptionConnexions);
        try {
            axios.delete(`http://localhost:3002/api/netdoc/connexions/deleteConnexio?idConneccio=${delconn.idConneccio}&infraDeviceName=${delconn.infraDeviceName}&finalDeviceName=${delconn.finalDeviceName}`);
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
                <h2 className='title-form'>Formulari de Connexionsns</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="infraDeviceName">Dispositiu infraestructura:</label>
                        <DispositiusInfraComboBox
                            onChange={handleChange}
                            nomDispositiuInfraestructura={formvaluesConnexions.infraDeviceName} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="portInfra">Port infraestructura:</label>
                        <PortsInfraComboBox
                            onChange={handleChange}
                            portInfra={formvaluesConnexions.portInfra}
                            nomDispositiuInfraestructura={formvaluesConnexions.infraDeviceName}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="config-Port">Configuracio del port:</label>
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
                        {/* Radio buttons: Undefined */}
                        <div>
                            <input type="radio" id="undefined" name="portStatus" value="undefined"
                                checked={formvaluesConnexions.portStatus === "undefined"}
                                onChange={handleChange} />
                            <label htmlFor="undefined">Undefined</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="finalDeviceName">Dispositu final:</label>
                        <DispositiusFinalComboBox
                            onChange={handleChange}
                            nomDispositiuFinal={formvaluesConnexions.finalDeviceName}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="endPort">Port final:</label>
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
                    ) : null}


                    <div className="form-group">
                        <label htmlFor="pachpanelName">Nom pachpanel:</label>
                        <input
                            type="text"
                            id="pachpanelName"
                            name="pachpanelName"
                            value={formvaluesConnexions.pachpanelName}
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

                    <div className="form-group">
                        {selectedRowConnexionsForm !== null ? (
                            <>
                                <button type="button" onClick={handleSaveRow}>Guardar</button>
                                <button type="button" onClick={handleCancelEditRow}>Cancel·la</button>
                            </>
                        ) : (
                            <>
                                <button type="submit">Connecta</button>
                                <button type="button" onClick={handleCancelEditRow}>Cancel·la</button>
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