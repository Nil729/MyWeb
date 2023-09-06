import pool from "../../../../database/db.connection";

import { getIdDispositiu } from "../dispositius/getIdDispositiu";



export default async function deleteConnexio(req, res) {



    const idConneccio = req.query.idConneccio;
    const infraDeviceName = req.query.infraDeviceName;
    const finalDeviceName = req.query.finalDeviceName;

    // Get the IDs of the infrastructure and final devices
    console.log('idConneccio: ', idConneccio);
    console.log('infraDeviceName: ', infraDeviceName);
    console.log('finalDeviceName: ', finalDeviceName);

    const typeDevice = await getIdDispositiu(finalDeviceName);
    console.log('typeDevice: ', typeDevice);
    console.log('typeDevice: ', typeDevice[0].deviceType);


    try {

        if (typeDevice[0].deviceType === 'Infra') {


            console.log(idConneccio)
            // Update PortsInfra for infrastructure device
            const deleteQuery = `
            DELETE pi_parent, pi_child
            FROM PortsInfra pi_parent
            JOIN ConexioTrunk ct ON pi_parent.IdPortInfra = ct.IdPortInfraParent_fk
            JOIN PortsInfra pi_child ON pi_child.IdPortInfra = ct.IdPortInfraChild_fk
            WHERE ct.IdConexioTrunk = ?
            `;

            // Execute the query
            await new Promise((resolve, reject) => {
                pool.query(deleteQuery, [idConneccio], (error) => {
                    if (error) {
                        console.error('Error deleting PortsInfra records:', error);
                        res.status(500).json({ message: 'Error deleting records', error });
                        reject(error);
                    } else {
                        console.log('PortsInfra records deleted successfully');
                        resolve();
                    }
                });
            });



            res.status(200).json({ message: 'Connection trunk updated successfully' });

        } else {


            console.log('idConneccio: ', idConneccio);

            const deleteQuery = `
            DELETE pi, pf
            FROM PortsInfra pi
            JOIN Coneccio c ON pi.IdPortInfra = c.IdPortInfra_fk
            JOIN PortsFinal pf ON pf.IdPortFinal = c.IdPortFinal_fk
            WHERE c.idConneccio = ?
            `;

            // Execute the query
            await new Promise((resolve, reject) => {
                pool.query(deleteQuery, [idConneccio], (error) => {
                    if (error) {
                        console.error('Error deleting PortsInfra and PortsFinal records:', error);
                        res.status(500).json({ message: 'Error deleting records', error });
                        reject(error);
                    } else {
                        console.log('PortsInfra and PortsFinal records deleted successfully');
                        resolve();
                    }
                });
            });



            // Send a success response
            res.status(200).json({ message: 'Connection trunk updated successfully' });
        }
    } catch (error) {
        console.error('Error updating connection:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }

}


