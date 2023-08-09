
import pool from "../../../../database/db.connection";

import { getIdDispositiuInfra, getIdDispositiuFinal } from "../dispositius/getIdDispositiu";
import {getIdPortInfra, getIdPortFinal} from "../ports/getIdPorts";

export default async function insertConneccio(req, res) {
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


    const infraDeviceId = await getIdDispositiuInfra(infraDeviceName);
    const finalDeviceId = await getIdDispositiuFinal(finalDeviceName);
    const portInfraId = await getIdPortInfra(infraDeviceId[0].id_dispositiuInfra, portInfra);
    const portFinalId = await getIdPortFinal(finalDeviceId[0].id_disposituFinal, endPort);
    

    console.log('infraDeviceId: ', infraDeviceId);
    console.log('finalDeviceId: ', finalDeviceId);


    try {

        if (finalDeviceId[0].deviceType === 'Infra') {
            console.log('finalDeviceId[0].deviceType: ', infraDeviceId[0].id_dispositiu);
            console.log('finalDeviceId port : ', endPort);

            pool.query(
                `INSERT INTO PortsInfra (IdPortInfra, EstatPOE, EstatXarxa, id_dispositiuInfra_fk, Id_vlan_fk, numPortInfra, pachpanelInfra) 
                 VALUES ( ?, ?)`,
                [infraDeviceId[0].id_dispositiu, portInfra] 
            );
                
            console.log('finalDeviceId[0].deviceType: ', finalDeviceId[0].id_dispositiu);
            console.log('finalDeviceId port : ', endPort);

            pool.query(
                `INSERT INTO PortsFinals (id_dispositiuFinal_fk, numPortFinal)
                    VALUES (?, ?)`,
                // no esta be, s'ha de fer 
                [finalDeviceId[0].id_dispositiu, endPort]
            );
    
            pool.query(
                `INSERT INTO ConeccioTrunk (IdPortInfraParent_fk, IdPortInfraChild_fk) VALUES (?, ?)`,
                [infraDeviceId[0].id_dispositiu, finalDeviceId[0].id_dispositiu]
            );

        } else {

            console.log('InfraDeviceId port : ', infraDeviceId);
            console.log('InfraDeviceId[0].deviceType: ', infraDeviceId[0].id_dispositiuInfra);
            console.log('InfraDeviceId port : ', portInfra);

            pool.query(
                `INSERT INTO PortsInfra (id_dispositiuInfra_fk, numPortInfra) 
                 VALUES ( ?, ?)`,
                [infraDeviceId[0].id_dispositiuInfra, portInfra]
                , (error, results) => {
                    if (error) {
                        console.error('Error inserting PortsInfra record:', error);
                        res.status(500).json({ message: 'Error inserting PortsInfra record', error });
                    } else {
                        console.log('PortsInfra record inserted successfully');
                    }
                }
            );

            console.log('finalDeviceId port : ', finalDeviceId);
            console.log('finalDeviceId[0].deviceType: ', finalDeviceId[0].id_disposituFinal);
            console.log('finalDeviceId port : ', endPort);

            pool.query(
                `INSERT INTO PortsFinal ( numPortFinal, id_disposituFinal_fk)
                    VALUES ( ?, ?)`,
                [finalDeviceId[0].id_disposituFinal, endPort]                
                , (error, results) => {
                    if (error) {
                        console.error('Error inserting PortsInfra record:', error);
                        res.status(500).json({ message: 'Error inserting PortsInfra record', error });
                    } else {
                        console.log('PortsFinal record inserted successfully');

                    }
                }
            );

            pool.query(
                `INSERT INTO Coneccio (IdPortInfra_fk, IdPortFinal_fk) VALUES (?, ?)`,
                [portInfraId[0].IdPortFinal, portFinalId[0].IdPortFinal]
                , (error, results) => {
                    if (error) {
                        console.error('Error inserting Coneccio record:', error);
                        res.status(500).json({ message: 'Error inserting Coneccio record', error });
                    } else {
                        console.log('Coneccio record inserted successfully');
                    }
                }
            );

        }

        res.status(200).json({ message: 'Records inserted successfully' });
    } catch (error) {
        console.error('Error inserting records:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
}