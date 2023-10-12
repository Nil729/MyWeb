import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaulaUbicacions from './TaulaUbicacions';
import { useSession, SessionProvider } from 'next-auth/react';

const UbicacioForm = () => {

    const { data: session, status } = useSession();
    const [error, setError] = useState(null);

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
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/ubicacions`);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const novaUbicacio = {
            sessionUser: session.user.id,
            ubicacioName: formvaluesUbicacio.ubicacioName,
            descriptionUbicacio: formvaluesUbicacio.descriptionUbicacio,
        };

        try {
            // Guardar la nova ubicacio a la base de dades

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/ubicacions`, novaUbicacio);
            console.log('novaUbicacio', novaUbicacio);
            // Check if the response contains an error message
            if (response.data && response.data.error) {
                setError(response.data.error);

            } else {
                setError(null);
                // Guardar la nova ubicacio a la 
                setUbicacioData((prevubicacio) => [...prevubicacio, novaUbicacio]);
            }

        } catch (error) {
            console.error(error);
            // Handle network errors or unexpected errors here
            if (error.response && error.response.data && error.response.data.error) {
                // Extract the specific error message from the response and set it as an error
                setError(error.response.data.error);
            } else {
                // Set a generic error message
                setError('An error occurred while sending the request.');
            }
        }

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
    const handleSaveRow = async () => {
        if (selectedRowUbicacioForm !== null) {
            const updatedubicacio = [...ubicacioData];

            updatedubicacio[selectedRowUbicacioForm] = {
                ubicacioName: formvaluesUbicacio.ubicacioName,
                descriptionUbicacio: formvaluesUbicacio.descriptionUbicacio,
            };

            console.log('update ubicació: ', updatedubicacio)

            try {

                const ubicacioId = ubicacioData[selectedRowUbicacioForm].idUbicacio; // Get the ubicacioId of the ubicacio to be updated
                console.log('ubicacioId', ubicacioId);

                // Guardar la nova ubicacio a la base de dades
                const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/ubicacioId?ubicacioId=${ubicacioId}`, updatedubicacio[selectedRowUbicacioForm]);
                console.log('updatedubicacio', updatedubicacio[selectedRowUbicacioForm]);

                // Check if the response contains an error message
                if (response.data && response.data.error) {
                    setError(response.data.error);
                } else {
                    setError(null);
                    // Guardar la nova ubicacio a la 
                    setUbicacioData(updatedubicacio);
                }

            } catch (error) {
                // Handle network errors or unexpected errors here
                if (error.response && error.response.data && error.response.data.error) {
                    // Extract the specific error message from the response and set it as an error
                    setError(error.response.data.error);
                } else {
                    // Set a generic error message
                    setError('An error occurred while sending the request.');
                }
            }

            setselectedRowUbiacioForm(null);
            setformvaluesUbicacio({
                ubicacioName: '',
                descriptionUbicacio: '',
            });

        }
    };

    const handleDeleteRowUbicacio = async (index) => {
        try {
            const ubicacioId = ubicacioData[index].idUbicacio; // Get the ubicacioId of the ubicacio to be deleted
            console.log('ubicacioId', ubicacioId);

            // Send a request to delete the ubicació
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/netdoc/ubicacioId?ubicacioId=${ubicacioId}`, ubicacioData[index]);

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

    const handleCancelRow = () => {
        setselectedRowUbiacioForm(null);
        setformvaluesUbicacio({
            ubicacioName: '',
            descriptionUbicacio: '',
        });
    };

    return (
        <>
        <div className="network-form-container">

            <div className="network-form">
                <div>
                    <h2 className='title-form'>Formulari de ubicacions</h2>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="ubicacioName">Nom de la Ubicació:</label>
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
                        {selectedRowUbicacioForm !== null ? (
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
            <TaulaUbicacions ubicacio={ubicacioData} onEditUbicacio={handleEditRowUbicacio} onDeleteUbicacio={handleDeleteRowUbicacio} />
        </div>
        </>
    );
};


export default UbicacioForm;
