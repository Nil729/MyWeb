import React, { useState } from 'react';

import TaulaUbicacions from './TaulaUbicacions';


const UbicacioForm = () => {
    const [ubicacioData, setUbicacioData] = useState([]);

    const [selectedRowUbicacioForm, setselectedRowUbiacioForm] = useState(null);

    const [formvaluesUbicacio, setformvaluesUbicacio] = useState({
        ubicacioName: '',
        descriptionUbicacio: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setformvaluesUbicacio((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const novaUbicacio = {
            ubicacioName: formvaluesUbicacio.ubicacioName,
            descriptionUbicacio: formvaluesUbicacio.descriptionUbicacio,
        };

        setUbicacioData((prevubicacio) => [...prevubicacio, novaUbicacio]);

        setformvaluesUbicacio({
            ubicacioName: '',
            descriptionUbicacio: '',
        });
    };


    const handleEditRowUbicacio = (index) => {
        console.log('index', index);

            
        // Omplir els camps del formulari amb les dades de la fila seleccionada
        const formvaluesUbicacio = ubicacioData[index];
        setformvaluesUbicacio({
            ubicacioName: formvaluesUbicacio.ubicacioName,
            descriptionUbicacio: formvaluesUbicacio.descriptionUbicacio,
        });


        setselectedRowUbiacioForm(index);
    };

    // Guardar els canvis
    const handleSaveRow = () => {
        if (selectedRowUbicacioForm !== null) {
            const updatedubicacio = [...ubicacioData];
            updatedubicacio[selectedRowUbicacioForm] = {
                ubicacioName: formvaluesUbicacio.ubicacioName,
                descriptionUbicacio: formvaluesUbicacio.descriptionUbicacio,
            };
            setUbicacioData(updatedubicacio);
            setselectedRowUbiacioForm(null);
            setformvaluesUbicacio({
                ubicacioName: '',
                descriptionUbicacio: '',
            });
        }
    };
    
    const handleDeleteRowUbicacio = (index) => {
        // Eliminar la fila seleccionada
        const updatedubicacio = [...ubicacioData];
        updatedubicacio.splice(index, 1);
        setUbicacioData(updatedubicacio);
        // gurada els canvis
        setselectedRowUbiacioForm(null);
        setformvaluesUbicacio({
            ubicacioName: '',
            descriptionUbicacio: '',
        });

    };


    return (
        <div className="network-form-container">
            <div className="network-form">
                <h2 className='title-form'>Formulari de ubicacions</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="ubicacioName">Nom de la Xarxa:</label>
                        <input
                            type="text"
                            id="ubicacioName"
                            name="ubicacioName"
                            value={formvaluesUbicacio.ubicacioName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descriptionUbicacio">Descripció:</label>
                        <textarea
                            id="descriptionUbicacio"
                            name="descriptionUbicacio"
                            value={formvaluesUbicacio.descriptionUbicacio}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" >Afegeix</button>

                        <button type='button' onClick={handleSaveRow} >Guardar</button>
                    </div>
                </form>
            </div>
            <TaulaUbicacions ubicacio={ubicacioData} onEditUbicacio={handleEditRowUbicacio} onDeleteUbicacio= {handleDeleteRowUbicacio} />
        </div>
    );
};


export default UbicacioForm;
