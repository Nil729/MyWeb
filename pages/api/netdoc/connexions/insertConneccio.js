
import pool from "../../../../database/db.connection";

import { getIdDispositiuInfra, getIdDispositiuFinal } from "../dispositius/getIdDispositiu";
import {getIdPortInfra, getIdPortFinal} from "../ports/getIdPorts";
import { insertEstatPortInfra } from "../ports/insertEstatPortInfra";
import getIdXarxa from "../xarxa/getIdXarxa";

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
                `INSERT INTO PortsFinals (numPortFinal, pachpanelFinal, id_dispositiuFinal_fk, )
                    VALUES (?, ?)`,
                // no esta be, s'ha de fer 
                [finalDeviceId[0].id_dispositiu, endPort]
            );
    
            pool.query(
                `INSERT INTO ConeccioTrunk (IdPortInfraParent_fk, IdPortInfraChild_fk) VALUES (?, ?)`,
                [infraDeviceId[0].id_dispositiu, finalDeviceId[0].id_dispositiu]
            );
            
            insertEstatPortInfra(infraDeviceId[0].id_dispositiu, portStatus, vlan, 1);

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
                [endPort, finalDeviceId[0].id_disposituFinal]                
                , (error, results) => {
                    if (error) {
                        console.error('Error inserting PortsInfra record:', error);
                        res.status(500).json({ message: 'Error inserting PortsInfra record', error });
                    } else {
                        console.log('PortsFinal record inserted successfully');

                    }
                }
            );

            console.log('infraDeviceId: ', infraDeviceId[0].id_dispositiuInfra, 'PortInfra: ', portInfra);
            const portInfraId = await getIdPortInfra(infraDeviceId[0].id_dispositiuInfra, portInfra);
            console.log('finalDeviceId: ', finalDeviceId[0].id_disposituFinal ,  'PortFinal: ', endPort )
            const portFinalId = await getIdPortFinal(finalDeviceId[0].id_disposituFinal, endPort);

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

            pool.query(
                `INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, VlanConfig ) VALUES (?, ?, ?)`,
                [portInfraId[0].IdPortInfra, idXarxa, portStatus ],
                (err, results) => {
                    if (err) {
                        console.log('Error Insert Estat Port Infra', err);
                    } else {
                        console.log('Estat record inserted successfully');
                    }
                }
            ) 
        }

        res.status(200).json({ message: 'Records inserted successfully' });
    } catch (error) {
        console.error('Error inserting records:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
}