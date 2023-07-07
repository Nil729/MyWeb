
// Import the dependency

import pool from "../../../database/db.connection.js";
//http://localhost:3002/api/netdoc/ubicacions

// Ejemplo de una lista de ubicaciones
let ubicacions = [];

export default function handlerNovaUbicacio(req, res) {

    if (req.method === 'POST') {
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

    
    } else {
        // Enviar una respuesta de error si se recibe un método de solicitud no admitido
        res.status(405).json({ error: 'Método no admitido' });
    }
}
