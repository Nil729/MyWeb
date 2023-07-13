
// Import the dependency

import pool from "../../../database/db.connection.js";
//http://localhost:3002/api/netdoc/ubicacions

// Ejemplo de una lista de ubicaciones

export default function handlerNovaUbicacio(req, res) {
    const { method, query: { ubicacioId } } = req;
    if (req.method === 'POST') {
        // Process a POST request
        const { ubicacioName, descriptionUbicacio } = req.body;

        // Create a new location object
        const novaUbicacio = {
        ubicacioName,
        descriptionUbicacio,
        };

        // Insert the new location into the database
         pool.query(
            'INSERT INTO Zona (NomZona, DescZona) VALUES (?, ?)',[novaUbicacio.ubicacioName, novaUbicacio.descriptionUbicacio],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Error inserting location into database' });
                } else {
                    novaUbicacio.id = results.insertId;
                    res.status(201).json(novaUbicacio);
                }

            }
        );

    } else if (req.method === 'GET') {
        console.log('GET');
        // Process a GET request
        pool.query('SELECT  Id_zona as idUbicacio, NomZona AS ubicacioName, DescZona AS descriptionUbicacio FROM Zona', (error, results, feilds) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Error retrieving locations from database' });
            } else {
                console.log(results);

                res.status(200).json(results);
            }
            // Disconnect from the 
            //pool.end();
        });

    } else if (req.method === 'PUT') {
        // Process a PUT request
        const { id, ubicacioName, descriptionUbicacio } = req.body;

        // Create a new location object
        const novaUbicacio = {
        id,
        ubicacioName,
        descriptionUbicacio,
        };

        // Update the location in the database
        pool.query(
            'UPDATE Zona SET NomZona = ?, DescZona = ? WHERE  Id_zona = ?',
            [novaUbicacio.ubicacioName, novaUbicacio.descriptionUbicacio, novaUbicacio.id],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Error updating location in database' });
                }
                res.status(200).json(novaUbicacio);
            }
        );
    } else {
        // Enviar una respuesta de error si se recibe un método de solicitud no admitido
        res.status(405).json({ error: 'Método no admitido' });
    }
}
