
import pool from "../../../../database/db.connection";
import getIdDispositiu from "../dispositius/getIdDispositiu";




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


    const infraDeviceId = await getIdDispositiu(infraDeviceName);
    const finalDeviceId = await getIdDispositiu(finalDeviceName);
    

    console.log('infraDeviceId: ', infraDeviceId);
    console.log('finalDeviceId: ', finalDeviceId);


    try {

        if (finalDeviceId[0].deviceType === 'Infra') {
            console.log('finalDeviceId[0].deviceType: ', finalDeviceId);
            pool.query(
                `INSERT INTO PortsFinals (id_dispositiuFinal_fk, numPortFinal)
                    VALUES (?, ?)`,
                // no esta be, s'ha de fer 
                [finalDeviceId, endPort] // Modify values as needed 
            );
    
            pool.query(
                `INSERT INTO PortsInfra (IdPortInfra, EstatPOE, EstatXarxa, id_dispositiuInfra_fk, Id_vlan_fk, numPortInfra, pachpanelInfra) 
                 VALUES ( ?, ?)`,
                [infraDeviceId, portInfra] // Modify values as needed
            );

            pool.query(
                `INSERT INTO ConeccioTrunk (IdPortInfraParent_fk, IdPortInfraChild_fk) VALUES (?, ?)`,
                [infraDeviceId[0].id_dispositiu, finalDeviceId[0].id_dispositiu]
            );

        } else {
            console.log('finalDeviceId port : ', finalDeviceId);
            pool.query(
                `INSERT INTO PortsInfra (id_dispositiuFinal_fk, numPortFinal)
                    VALUES (?, ?)`,
                [finalDeviceId[0].id_dispositiu, endPort] // Modify values as needed
            );
    
            pool.query(
                `INSERT INTO PortsInfra (id_dispositiuInfra_fk, numPortInfra) 
                 VALUES (?, ?)`,
                [infraDeviceId[0].id_dispositiu, portInfra] // Modify values as needed
            );

            pool.query(
                `INSERT INTO Coneccio (IdPortInfra_fk, IdPortFinal_fk) VALUES (?, ?)`,
                [infraDeviceId[0].id_dispositiu, finalDeviceId[0].id_dispositiu]
            );

        }

        res.status(200).json({ message: 'Records inserted successfully' });
    } catch (error) {
        console.error('Error inserting records:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
}