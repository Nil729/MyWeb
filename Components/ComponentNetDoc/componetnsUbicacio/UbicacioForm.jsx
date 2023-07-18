import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TaulaUbicacions from './TaulaUbicacions';


const UbicacioForm = () => {
    const [ubicacioData, setUbicacioData] = useState([]);

    const [selectedRowUbicacioForm, setselectedRowUbiacioForm] = useState(null);

    const [formvaluesUbicacio, setformvaluesUbicacio] = useState({
        ubicacioName: '',
        descriptionUbicacio: '',
    });

    // Fetch the ubicacio data on component mount
    useEffect(() => {
        fetchUbicacioData();
    }, []);

    const fetchUbicacioData = async () => {
        try {
            // Fetch ubicacio data from the API
            const response = await axios.get('http://localhost:3002/api/netdoc/ubicacions');
            // Set ubicacio data state
            console.log('response', response.data);
            setUbicacioData(response.data);

        } catch (error) {
            console.error(error);
        }
    };

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

        try {
            // Guardar la nova ubicacio a la base de dades

            axios.post('http://localhost:3002/api/netdoc/ubicacions', novaUbicacio);
            console.log('novaUbicacio', novaUbicacio);

            // Guardar la nova ubicacio a la 
            setUbicacioData((prevubicacio) => [...prevubicacio, novaUbicacio]);

            setformvaluesUbicacio({
                ubicacioName: '',
                descriptionUbicacio: '',
            });

        } catch (error) {
            console.log('error', error);
        }

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

            try {
                const ubicacioId = ubicacioData[selectedRowUbicacioForm].idUbicacio; // Get the ubicacioId of the ubicacio to be updated
                console.log('ubicacioId', ubicacioId);
                // Guardar la nova ubicacio a la base de dades
                axios.put(`http://localhost:3002/api/netdoc/ubicacioId?ubicacioId=${ubicacioId}`, updatedubicacio[selectedRowUbicacioForm]);
                console.log('updatedubicacio', updatedubicacio[selectedRowUbicacioForm]);


            }  catch (error) {
                console.log('error', error);
            }
        }
    };

    const handleDeleteRowUbicacio = async (index) => {
        try {
            const ubicacioId = ubicacioData[index].idUbicacio; // Get the ubicacioId of the ubicacio to be deleted
            console.log('ubicacioId', ubicacioId);

            // Send a request to delete the ubicació
            await axios.delete(`/api/netdoc/ubicacioId?ubicacioId=${ubicacioId}`, ubicacioData[index]);

            // Update the ubicacioData state to reflect the deletion
            const updatedUbicacioData = [...ubicacioData];
            updatedUbicacioData.splice(index, 1);
            setUbicacioData(updatedUbicacioData);

            // Reset form values and selectedRowUbicacioForm
            setselectedRowUbiacioForm(null);
            setformvaluesUbicacio({
                ubicacioName: "",
                descriptionUbicacio: "",
            });
        } catch (error) {
            console.error(error);
        }
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
            <TaulaUbicacions ubicacio={ubicacioData} onEditUbicacio={handleEditRowUbicacio} onDeleteUbicacio={handleDeleteRowUbicacio} />
        </div>
    );
};


export default UbicacioForm;
