import React, { useState } from 'react';

import ConnexionsTable from './TaulaConnexions';


const ConnexionsForm = () => {
    const [connexionsData, setconnexionsData] = useState([]);

    const [selectedRowConnexionsForm, setselectedRowUbiacioForm] = useState(null);

    const [formvaluesConnexions, setformvaluesConnexions] = useState({
        connexionsName: '',
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
            connexionsName: formvaluesConnexions.connexionsName,
            descriptionConnexions: formvaluesConnexions.descriptionConnexions,
        };

        setconnexionsData((prevConnexions) => [...prevConnexions, novaConnexions]);

        setformvaluesConnexions({
            connexionsName: '',
            descriptionConnexions: '',
        });
    };


    const handleEditRowConnexions = (index) => {
            
        // Omplir els camps del formulari amb les dades de la fila seleccionada
        const formvaluesConnexions = connexionsData[index];
        setformvaluesConnexions({
            connexionsName: formvaluesConnexions.connexionsName,
            descriptionConnexions: formvaluesConnexions.descriptionConnexions,
        });


        setselectedRowUbiacioForm(index);
    };

    // Guardar els canvis
    const handleSaveRow = () => {
        if (selectedRowConnexionsForm !== null) {
            const updatedConnexions = [...connexionsData];
            updatedConnexions[selectedRowConnexionsForm] = {
                connexionsName: formvaluesConnexions.connexionsName,
                descriptionConnexions: formvaluesConnexions.descriptionConnexions,
            };
            setconnexionsData(updatedConnexions);
            setselectedRowUbiacioForm(null);
            setformvaluesConnexions({
                connexionsName: '',
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
            connexionsName: '',
            descriptionConnexions: '',
        });

    };


    return (
        <div className="network-form-container">
            <div className="network-form">
                <h2 className='title-form'>Formulari de Connexionsns</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="connexionsName">Nom de la Xarxa:</label>
                        <input
                            type="text"
                            id="connexionsName"
                            name="connexionsName"
                            value={formvaluesConnexions.connexionsName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descriptionConnexions">Descripció:</label>
                        <textarea
                            id="descriptionConnexions"
                            name="descriptionConnexions"
                            value={formvaluesConnexions.descriptionConnexions}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" >Afegeix</button>

                        <button type='button' onClick={handleSaveRow} >Guardar</button>
                    </div>
                </form>
            </div>
            
            <ConnexionsTable connexions={connexionsData} onEditConnexions={handleEditRowConnexions} onDeleteConnexions= {handleDeleteRowConnexions} />
        </div>
    );
};


export default ConnexionsForm;
