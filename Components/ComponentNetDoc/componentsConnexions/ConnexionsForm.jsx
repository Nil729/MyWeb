import React, { useState } from 'react';

import ConnexionsTable from './TaulaConnexions';
import DispositiusInfraComboBox from '../componentsDispositius/dispositiusComboBox/DispositiusInfraComboBox';


const ConnexionsForm = () => {
    const [connexionsData, setconnexionsData] = useState([]);

    const [selectedRowConnexionsForm, setselectedRowUbiacioForm] = useState(null);

    const [formvaluesConnexions, setformvaluesConnexions] = useState({
        InfraName: '',
        portInfra: '',
        portStatus: '',
        finalDeviceName: '',
        pachpanelName: '',
        xarxaName: '',
        descriptionConnexions: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setformvaluesConnexions((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const novaConnexions = {
            InfraName: formvaluesConnexions.InfraName,
            portInfra: formvaluesConnexions.portInfra,
            portStatus: formvaluesConnexions.portStatus,
            finalDeviceName: formvaluesConnexions.finalDeviceName,
            pachpanelName: formvaluesConnexions.pachpanelName,
            xarxaName: formvaluesConnexions.xarxaName,
            descriptionConnexions: formvaluesConnexions.descriptionConnexions,
        };

        setconnexionsData((prevConnexions) => [...prevConnexions, novaConnexions]);

        setformvaluesConnexions({
            InfraName: '',
            portInfra: '',
            portStatus: '',
            finalDeviceName: '',
            pachpanelName: '',
            xarxaName: '',
            descriptionConnexions: '',
        });
    };


    const handleEditRowConnexions = (index) => {
        console.log('Edita la fila: ', index);
        // Omplir els camps del formulari amb les dades de la fila seleccionada
        const formvaluesConnexions = connexionsData[index];
        setformvaluesConnexions({
            InfraName: formvaluesConnexions.InfraName,
            portInfra: formvaluesConnexions.portInfra,
            portStatus: formvaluesConnexions.portStatus,
            finalDeviceName: formvaluesConnexions.finalDeviceName,
            pachpanelName: formvaluesConnexions.pachpanelName,
            xarxaName: formvaluesConnexions.xarxaName,
            descriptionConnexions: formvaluesConnexions.descriptionConnexions,
        });


        setselectedRowUbiacioForm(index);
    };

    // Guardar els canvis
    const handleSaveRow = () => {
        if (selectedRowConnexionsForm !== null) {
            const updatedConnexions = [...connexionsData];
            updatedConnexions[selectedRowConnexionsForm] = {
                InfraName: formvaluesConnexions.InfraName,
                portInfra: formvaluesConnexions.portInfra,
                portStatus: formvaluesConnexions.portStatus,
                finalDeviceName: formvaluesConnexions.finalDeviceName,
                pachpanelName: formvaluesConnexions.pachpanelName,
                xarxaName: formvaluesConnexions.xarxaName,
                descriptionConnexions: formvaluesConnexions.descriptionConnexions,
            };
            setconnexionsData(updatedConnexions);
            setselectedRowUbiacioForm(null);
            setformvaluesConnexions({
                InfraName: '',
                portInfra: '',
                portStatus: '',
                finalDeviceName: '',
                pachpanelName: '',
                xarxaName: '',
                descriptionConnexions: '',
            });
        }
    };

    const handleDeleteRowConnexions = (index) => {
        // Eliminar la fila seleccionada
        const updatedConnexions = [...connexionsData];
        updatedConnexions.splice(index, 1);
        setconnexionsData(updatedConnexions);
        // gurada els canvis
        setselectedRowUbiacioForm(null);
        setformvaluesConnexions({
            InfraName: '',
            portInfra: '',
            portStatus: '',
            finalDeviceName: '',
            pachpanelName: '',
            xarxaName: '',
            descriptionConnexions: '',
        });

    };


    return (
        <div className="network-form-container">
            <div className="network-form">
                <h2 className='title-form'>Formulari de Connexionsns</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="InfraName">DispostituInfraestructura:</label>
                        <DispositiusInfraComboBox onChange={handleChange} value={formvaluesConnexions.nomDispositiuInfraestructura} />

                    </div>

                    <div className="form-group">
                        <label htmlFor="portInfra">Port:</label>
                        <input
                            type="text"
                            id="portInfra"
                            name="portInfra"
                            value={formvaluesConnexions.portInfra}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="config-Port">Configuracio del port:</label>
                        {/* Radio buttons: Tagged */}
                        <div>
                            <input type="radio" id="tagged" name="portStatus" value="tagged" 
                            checked= {formvaluesConnexions.portStatus === "tagged"}
                            onChange={handleChange}
                            />
                            <label htmlFor="tagged">Tagged</label>
                        </div>
                        {/* Radio buttons: Untagged */}
                        <div>
                            <input type="radio" id="untagged" name="portStatus" value="untagged" 
                            checked= {formvaluesConnexions.portStatus === "untagged"}
                            onChange={handleChange}
                            />
                            <label htmlFor="untagged">Untagged</label>
                        </div>
                        {/* Radio buttons: Undefined */}
                        <div>
                            <input type="radio" id="undefined" name="portStatus" value="undefined"
                            checked= {formvaluesConnexions.portStatus === "undefined"}
                            onChange={handleChange}/>
                            <label htmlFor="undefined">Undefined</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="finalDeviceName">Dispositu final:</label>
                        <input
                            type="text"
                            id="finalDeviceName"
                            name="finalDeviceName"
                            value={formvaluesConnexions.finalDeviceName}
                            onChange={handleChange}
                            required
                        />
                    </div>

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
                        <label htmlFor="xarxaName">Xarxa:</label>
                        <input
                            type="text"
                            id="xarxaName"
                            name="xarxaName"
                            value={formvaluesConnexions.xarxaName}
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
                        <button type="submit" >Connecta</button>

                        <button type='button' onClick={handleSaveRow} >Guardar</button>
                    </div>
                </form>
            </div>
            <ConnexionsTable connexions={connexionsData} onEditConnexions={handleEditRowConnexions} onDeleteConnexions={handleDeleteRowConnexions} />
        </div>
    );
};


export default ConnexionsForm;
