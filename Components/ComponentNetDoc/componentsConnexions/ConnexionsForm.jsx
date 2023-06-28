import React, { useState } from 'react';

import ConnexionsTable from './TaulaConnexions';


const ConnexionsForm = () => {
    const [connexionsData, setconnexionsData] = useState([]);

    const [selectedRowConnexionsForm, setselectedRowUbiacioForm] = useState(null);

    const [formvaluesConnexions, setformvaluesConnexions] = useState({
        InfraName: '',
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
            descriptionConnexions: formvaluesConnexions.descriptionConnexions,
        };

        setconnexionsData((prevConnexions) => [...prevConnexions, novaConnexions]);

        setformvaluesConnexions({
            InfraName: '',
            descriptionConnexions: '',
        });
    };


    const handleEditRowConnexions = (index) => {

        // Omplir els camps del formulari amb les dades de la fila seleccionada
        const formvaluesConnexions = connexionsData[index];
        setformvaluesConnexions({
            InfraName: formvaluesConnexions.InfraName,
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
                descriptionConnexions: formvaluesConnexions.descriptionConnexions,
            };
            setconnexionsData(updatedConnexions);
            setselectedRowUbiacioForm(null);
            setformvaluesConnexions({
                InfraName: '',
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
            descriptionConnexions: '',
        });

    };


    return (
        <div className="network-form-container">
            <div className="network-form">
                <h2 className='title-form'>Formulari de Connexionsns</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="connexionsInfraDiviceName">Dispostitu Infraestructura:</label>
                        <input
                            type="text"
                            id="InfraName"
                            name="InfraName"
                            value={formvaluesConnexions.InfrastuctureDeviceName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="connexionsPortNumberInfrastuctureDevice">Port:</label>
                        <input
                            type="text"
                            id="InfraName"
                            name="InfraName"
                            value={formvaluesConnexions.PortNumberInfrastuctureDevice}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="config-Port">Configuracio del port:</label>
                        {/* Radio buttons: Tagged */}
                        <div>
                            <input type="radio" id="tagged" name="portStatus" value="tagged" />
                            <label htmlFor="tagged">Tagged</label>
                        </div>
                        {/* Radio buttons: Untagged */}
                        <div>
                            <input type="radio" id="untagged" name="portStatus" value="untagged" />
                            <label htmlFor="untagged">Untagged</label>
                        </div>
                        {/* Radio buttons: Undefined */}
                        <div>
                            <input type="radio" id="undefined" name="portStatus" value="undefined" />
                            <label htmlFor="undefined">Undefined</label>
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="InfraName">Xarxa:</label>
                        <input
                            type="text"
                            id="InfraName"
                            name="InfraName"
                            value={formvaluesConnexions.xarxaName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="InfraName">Dispositu final:</label>
                        <input
                            type="text"
                            id="InfraName"
                            name="InfraName"
                            value={formvaluesConnexions.finalDeviceName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="InfraName">Nom pachpanel:</label>
                        <input
                            type="text"
                            id="InfraName"
                            name="InfraName"
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
