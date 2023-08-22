import pool from "../../../../database/db.connection";

import { getIdDispositiu, getIdDispositiuInfra, getIdDispositiuFinal } from "../dispositius/getIdDispositiu";
import { getIdPortInfra, getIdPortFinal } from "../ports/getIdPorts";
import getIdXarxa from "../xarxa/getIdXarxa";
import { updateEstatPortInfra } from "../ports/updateEstatPortInfra";


export default async function updateConnexions(req, res) {

    console.log('req.body: ', req.body);

    const {
        idConneccio,
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


    try {

        if (typeDevice[0].deviceType === 'Infra') {

            const infraDeviceId = await getIdDispositiuInfra(infraDeviceName);
            const finalDeviceId = await getIdDispositiuInfra(finalDeviceName);
            console.log('infraDeviceId: ', infraDeviceId, 'finalDeviceId: ', finalDeviceId);

            console.log(portInfra, infraDeviceId[0].id_dispositiuInfra, idConneccio)
            // Update PortsInfra for infrastructure device
            await new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE PortsInfra
                    SET numPortInfra = ?,
                    id_dispositiuInfra_fk = ?
                    WHERE  IdPortInfra = (select IdPortInfraParent_fk from ConexioTrunk where  IdConexioTrunk = ?)`,
                    [portInfra, infraDeviceId[0].id_dispositiuInfra, idConneccio],
                    (error) => {
                        if (error) {
                            console.error('Error updating PortsInfra record:', error);
                            res.status(500).json({ message: 'Error updating PortsInfra record', error });
                            reject(error);
                        } else {
                            console.log('PortsInfra record updated successfully');
                            resolve();
                        }
                    }
                );
            });

            // Update PortsInfra for final device
            await new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE PortsInfra
                    SET numPortInfra = ?,
                    id_dispositiuInfra_fk = ?
                    WHERE  IdPortInfra = (select IdPortInfraChild_fk from ConexioTrunk where  IdConexioTrunk = ?)`,
                    [endPort, finalDeviceId[0].id_dispositiuInfra, idConneccio],
                    (error, results) => {
                        if (error) {
                            console.error('Error inserting PortsInfra record:', error);
                            res.status(500).json({ message: 'Error inserting PortsInfra record', error });
                            reject(error
                                );
                        } else {
                            console.log('PortsInfra record inserted successfully');
                            resolve();
                        }
                    }
                );
            });

            console.log('infraDeviceId: ', infraDeviceId[0].id_dispositiuInfra, 'PortInfra: ', portInfra);
            const portInfraId = await getIdPortInfra(infraDeviceId[0].id_dispositiuInfra, portInfra);
    

            console.log('portInfraId: ', portInfraId);

            const idXarxa = await getIdXarxa(vlan);

            // if portStatus === "Tagged" make a udate loop for each id vlan selected if Its Untaged only do one update, and if it's undefined make one update and set idXarxa on "null"

            console.log('PortInfra: ', portInfraId[0].IdPortInfra, 'IdXarxa: ', idXarxa, 'VlanConfig; ', portStatus)
            await updateEstatPortInfra(portInfraId[0].IdPortInfra, idXarxa, portStatus);


            res.status(200).json({ message: 'Connection trunk updated successfully' });

        } else {

            const infraDeviceId = await getIdDispositiuInfra(infraDeviceName);
            const finalDeviceId = await getIdDispositiuFinal(finalDeviceName);
            console.log('infraDeviceId: ', infraDeviceId, 'finalDeviceId: ', finalDeviceId);
            
            
            console.log('connexioId: ',idConneccio);

            // Update PortsInfra for infrastructure device
            await new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE PortsInfra
                    SET numPortInfra = ?,
                    id_dispositiuInfra_fk = ?
                    WHERE  IdPortInfra = (select IdPortInfra_fk from Coneccio where idConneccio = ? )`,
                    [portInfra, infraDeviceId[0].id_dispositiuInfra, idConneccio],
                    (error) => {
                        if (error) {
                            console.error('Error updating PortsInfra record:', error);
                            res.status(500).json({ message: 'Error updating PortsInfra record', error });
                            reject(error);
                        } else {
                            console.log('PortsInfra record updated successfully');
                            resolve();
                        }
                    }
                );
            });

            // Update PortsFinal for final device
            await new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE PortsFinal
                    SET numPortFinal = ?,
                    id_disposituFinal_fk = ?
                    WHERE IdPortFinal = (select IdPortFinal_fk from Coneccio where idConneccio = ? )`,
                    [endPort, finalDeviceId[0].id_disposituFinal, idConneccio],
                    (error) => {
                        if (error) {
                            console.error('Error inserting PortsInfra record:', error);
                            res.status(500).json({ message: 'Error inserting PortsInfra record', error });
                            reject(error);
                        } else {
                            console.log('PortsFinal record updated successfully');
                            resolve();
                        }
                    }
                );
            });
            
            
            console.log('infraDeviceId: ', infraDeviceId[0].id_dispositiuInfra, 'PortInfra: ', portInfra);
            const portInfraId = await getIdPortInfra(infraDeviceId[0].id_dispositiuInfra, portInfra);
            
            console.log('finalDeviceId: ', finalDeviceId[0].id_disposituFinal ,  'PortFinal: ', endPort )
            const portFinalId = await getIdPortFinal(finalDeviceId[0].id_disposituFinal, endPort);

            console.log('portInfraId: ', portInfraId[0].IdPortInfra, 'portFinalId: ', portFinalId[0].IdPortFinal);

            const idXarxa = await getIdXarxa(vlan);
            console.log('PortInfra: ', portInfraId[0].IdPortInfra, 'IdXarxa: ', idXarxa, 'VlanConfig; ', portStatus)
            await updateEstatPortInfra(portInfraId[0].IdPortInfra, idXarxa, portStatus);
            

            // Send a success response
            res.status(200).json({ message: 'Connection trunk updated successfully' });
        }
    } catch (error) {
        console.error('Error updating connection:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
}
