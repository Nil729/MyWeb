
import pool from "../../../../database/db.connection";

import { 
        getIdDispositiu, 
        getIdDispositiuInfra, 
        getIdDispositiuFinal 
} from "../dispositius/getIdDispositiu";

import {getIdPortInfra, getIdPortFinal} from "../ports/getIdPorts";
import { insertEstatPortInfra } from "../ports/insertEstatPortInfra";
import getIdXarxa from "../xarxa/getIdXarxa";

export default async function insertConnexio(req, res) {
    console.log('req.body: ', req.body);
    const { 
        infraDeviceName,
        portInfra,
        portStatus,
        finalDeviceName,
        endPort,
        pachpanelName,
        vlan,
        descriptionConnexions 
    } = req.body;

    console.log('infraDeviceName: ', infraDeviceName);
    console.log('finalDeviceName: ', finalDeviceName);

    const typeDevice = await getIdDispositiu(finalDeviceName)
    console.log('typeDevice: ', typeDevice);
    console.log('typeDevice: ', typeDevice[0].deviceType);
    try {
        
        if (typeDevice[0].deviceType === 'Infra') {
            
            const infraDeviceId = await getIdDispositiuInfra(infraDeviceName);
            const finalDeviceId = await getIdDispositiuInfra(finalDeviceName);

            console.log('infraDeviceId: ', infraDeviceId);
            console.log('finalDeviceId: ', finalDeviceId);


            console.log('finalDeviceId[0]: ', infraDeviceId[0].id_dispositiuInfra);
            console.log('finalDeviceId port : ', endPort);

            // pool.query(
            //     `INSERT INTO PortsInfra (IdPortInfra, EstatPOE, EstatXarxa, id_dispositiuInfra_fk, Id_vlan_fk, numPortInfra, pachpanelInfra) 
            //      VALUES ( ?, ?)`,
            //     [infraDeviceId[0].id_dispositiu, portInfra] 
            // );
                
            console.log('finalDeviceId[0]: ', finalDeviceId[0].id_dispositiuInfra);
            console.log('finalDeviceId port : ', endPort);

            // pool.query(
            //     `INSERT INTO PortsInfra (IdPortInfra, EstatPOE, EstatXarxa, id_dispositiuInfra_fk, Id_vlan_fk, numPortInfra, pachpanelInfra) 
            //      VALUES ( ?, ?)`,
            //     // no esta be, s'ha de fer 
            //     [finalDeviceId[0].id_dispositiu, endPort]
            // );
            await new Promise((resolve, reject) => {
                pool.query(
                    `INSERT INTO PortsInfra (id_dispositiuInfra_fk, numPortInfra)
                    VALUES ( ?, ?)`,
                    [infraDeviceId[0].id_dispositiuInfra, portInfra]
                    ,(error, results) => {
                        if (error) {
                            console.error('Error inserting PortsInfra record:', error);
                            res.status(500).json({ message: 'Error inserting PortsInfra record', error });
                            reject(error);
                        } else {
                            console.log('PortsInfra record inserted successfully');
                            resolve();
                        }
                    }
                );
            });

            await new Promise((resolve, reject) => {
                pool.query(
                    `INSERT INTO PortsInfra (id_dispositiuInfra_fk, numPortInfra) 
                    VALUES ( ?, ?)`,
                    [finalDeviceId[0].id_dispositiuInfra, endPort]
                    ,(error, results) => {
                        if (error) {
                            console.error('Error inserting PortsInfra record:', error);
                            res.status(500).json({ message: 'Error inserting PortsInfra record', error });
                            reject(error);
                        } else {
                            console.log('PortsInfra record inserted successfully');
                            resolve();
                        }
                    }
                );
            });
                
            console.log('infraDeviceId: ', infraDeviceId[0].id_dispositiuInfra, 'PortInfra: ', portInfra);
            const portInfraId = await getIdPortInfra(infraDeviceId[0].id_dispositiuInfra, portInfra);
            console.log('finalDeviceId: ', finalDeviceId[0].id_dispositiuInfra ,  'PortFinal: ', endPort )
            const portFinalId = await getIdPortInfra(finalDeviceId[0].id_dispositiuInfra, endPort);
            
            console.log('portInfraId: ', portInfraId, 'portFinalId: ', portFinalId);
            
            pool.query(
                `INSERT INTO ConexioTrunk (IdPortInfraParent_fk, IdPortInfraChild_fk) VALUES (?, ?)`,
                [portInfraId[0].IdPortInfra, portFinalId[0].IdPortInfra]
                , (error, results) => {
                    if (error) {
                        console.error('Error inserting Coneccio record:', error);
                        res.status(500).json({ message: 'Error inserting Coneccio record', error });
                        reject(error);
                    } else {
                        console.log('Coneccio record inserted successfully');
                    }
                }
                
            );

        
            const idXarxa = await getIdXarxa(vlan);
            console.log('PortInfra: ', portInfraId[0].IdPortInfra, 'IdXarxa: ', idXarxa, 'VlanConfig; ', portStatus)
            await insertEstatPortInfra(portInfraId[0].IdPortInfra, idXarxa, portStatus);

        } else {

            const infraDeviceId = await getIdDispositiuInfra(infraDeviceName);
            const finalDeviceId = await getIdDispositiuFinal(finalDeviceName);

            console.log('InfraDeviceId: ', infraDeviceId);

            console.log('InfraDeviceId port : ', portInfra);

            // Insert into PortsInfra
            await new Promise((resolve, reject) => {
                pool.query(
                    `INSERT INTO PortsInfra (id_dispositiuInfra_fk, numPortInfra) VALUES (?, ?)`,
                    [infraDeviceId[0].id_dispositiuInfra, portInfra],
                    (error, results) => {
                        if (error) {
                            console.error('Error inserting PortsInfra record:', error);
                            res.status(500).json({ message: 'Error inserting PortsInfra record', error });
                            reject(error);
                        } else {
                            console.log('PortsInfra record inserted successfully');
                            resolve();
                        }
                    }
                );
            });

            // Insert into PortsFinal
            await new Promise((resolve, reject) => {
                pool.query(
                    `INSERT INTO PortsFinal (numPortFinal, id_disposituFinal_fk) VALUES (?, ?)`,
                    [endPort, finalDeviceId[0].id_disposituFinal],
                    (error, results) => {
                        if (error) {
                            console.error('Error inserting PortsFinal record:', error);
                            res.status(500).json({ message: 'Error inserting PortsInfra record', error });
                            reject(error);
                        } else {
                            console.log('PortsFinal record inserted successfully');
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

            pool.query(
                `INSERT INTO Coneccio (IdPortInfra_fk, IdPortFinal_fk) VALUES (?, ?)`,
                [portInfraId[0].IdPortInfra, portFinalId[0].IdPortFinal]
                , (error, results) => {
                    if (error) {
                        console.error('Error inserting Coneccio record:', error);
                        res.status(500).json({ message: 'Error inserting Coneccio record', error });
                    } else {
                        console.log('Coneccio record inserted successfully');
                    }
                }
                
            ); 

            const idXarxa = await getIdXarxa(vlan);
            console.log('PortInfra: ', portInfraId[0].IdPortInfra, 'IdXarxa: ', idXarxa, 'VlanConfig; ', portStatus)
            await insertEstatPortInfra(portInfraId[0].IdPortInfra, idXarxa, portStatus);
        }

        res.status(200).json({ message: 'Records inserted successfully' });
    } catch (error) {
        console.error('Error inserting records:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
}