import pool from "../../../../database/db.connection";

import { getIdDispositiu, getIdDispositiuInfra, getIdDispositiuFinal } from "../dispositius/getIdDispositiu";
import { getIdPortInfra, getIdPortFinal } from "../ports/getIdPorts";

import getIdXarxa from "../xarxa/getIdXarxa";


export default async function updateConnexions(req, res) {
    
    console.log('req.body: ', req.body);

    const {
        connectionId,
        infraDeviceName,
        portInfra,
        portStatus,
        finalDeviceName,
        endPort,
        pachpanelName,
        vlan,
        descriptionConnexions
    } = req.body;

    // Get the IDs of the infrastructure and final devices
    console.log('infraDeviceName: ', infraDeviceName);
    console.log('finalDeviceName: ', finalDeviceName);

    const typeDevice = await getIdDispositiu(finalDeviceName);
    console.log('typeDevice: ', typeDevice);
    console.log('typeDevice: ', typeDevice[0].deviceType);

    const idXarxa = await getIdXarxa(vlan);


    try {

        if (typeDevice[0].deviceType === 'Infra') {

            const infraDeviceId = await getIdDispositiuInfra(infraDeviceName);
            const finalDeviceId = await getIdDispositiuInfra(finalDeviceName);
            console.log('infraDeviceId: ', infraDeviceId[0].id_dispositiuInfra, 'PortInfra: ', portInfra);
            console.log('finalDeviceId: ', finalDeviceId[0].id_dispositiuInfra ,  'PortFinal: ', endPort );


            const portInfraId = await getIdPortInfra(infraDeviceId[0].id_dispositiuInfra, portInfra)
            console.log('portInfraId: ', portInfraId);
            console.log('portInfraId: ', portInfraId[0] );
            console.log('portInfraId: ', portInfraId[0].IdPortInfra );
            

            const portFinalId = await getIdPortInfra(finalDeviceId[0].id_dispositiuInfra, endPort);
            console.log('portInfraId: ', portFinalId);
            console.log('portInfraId: ', portFinalId[0] );
            console.log('portInfraId: ', portFinalId[0].id_dispositiuInfra );
            
           // Update PortsInfra for infrastructure device
            pool.query(
                `UPDATE PortsInfra
                SET numPortInfra = ?
                WHERE IdPortInfra = ?`,
                [portInfra, portInfraId[0].IdPortInfra],
                (error, results) => {
                    if (error) {
                        console.error('Error updating PortsInfra:', error);
                        res.status(500).json({ message: 'Error updating PortsInfra', error });
                    } else {
                        console.log('PortsInfra updated successfully');
                    }
                }
            );

            // Update PortsInfra for final device
            pool.query(
                `UPDATE PortsInfra
                SET numPortInfra = ?
                WHERE  IdPortFinal = ?`,
                [endPort, portFinalId[0].IdPortInfra],
                (error, results) => {
                    if (error) {
                        console.error('Error updating PortsInfra:', error);
                        res.status(500).json({ message: 'Error updating PortsInfra', error });
                    } else {
                        console.log('PortsInfra updated successfully');
                    }
                }
            );

            res.status(200).json({ message: 'Connection trunk updated successfully' });

        } else {

            const infraDeviceId = await getIdDispositiuInfra(infraDeviceName);
            const finalDeviceId = await getIdDispositiuFinal(finalDeviceName);
            
            console.log('infraDeviceId: ', infraDeviceId[0].id_dispositiuInfra, 'PortInfra: ', portInfra);
            const portInfraId = await getIdPortInfra(infraDeviceId[0].id_dispositiuInfra, portInfra);
            console.log('finalDeviceId: ', finalDeviceId[0].id_dispositiuInfra ,  'PortFinal: ', endPort )
            const portFinalId = await getIdPortInfra(finalDeviceId[0].id_dispositiuInfra, endPort);
            
            // Update PortsInfra for infrastructure device
            pool.query(
                `UPDATE PortsInfra
                SET numPortInfra = ?
                WHERE id_dispositiuInfra_fk = ?`,
                [portInfra, portInfraId[0].IdPortInfra],
                (error, results) => {
                    if (error) {
                        console.error('Error updating PortsInfra:', error);
                        res.status(500).json({ message: 'Error updating PortsInfra', error });
                    } else {
                        console.log('PortsInfra updated successfully');
                    }
                }
            );

            // Update PortsFinal for final device
            pool.query(
                `UPDATE PortsFinal
                SET numPortFinal = ?
                WHERE id_dispositiuFinal_fk = ?`,
                [endPort, portFinalId[0].IdPortInfra],
                (error, results) => {
                    if (error) {
                        console.error('Error updating PortsInfra:', error);
                        res.status(500).json({ message: 'Error updating PortsInfra', error });
                    } else {
                        console.log('PortsInfra updated successfully');
                    }
                }
            );

                // Update Xarxa and Estat for both ports
                // You can implement similar queries for Xarxa and Estat tables as needed

            // Send a success response
            res.status(200).json({ message: 'Connection trunk updated successfully' });
        }
    } catch (error) {
        console.error('Error updating connection:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
}
