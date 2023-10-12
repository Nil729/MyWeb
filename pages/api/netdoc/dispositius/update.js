import pool from "../../../../database/db.connection";
import { handleDatabaseError } from '../../../api/apiUtils/databaseUtils.js';
import getIdZona from "../getIdZona";
import getIdXarxa from "../xarxa/getIdXarxa";

export default async function updateDispositiu(req, res) {
    try {

        const { NomDispositiu, deviceType, ip, mac, quantitatPortsEth, zona_id, id_dispositiu, sessionId} = req.body;

        const resultsZona = await getIdZona(sessionId, zona_id);
        //const resultsXarxa = await getIdXarxa(Id_vlan);
        
        console.log("id_dispositiu: " + id_dispositiu + "Nom dipositiu" + NomDispositiu + "deviceType: " + deviceType + "ip: " + ip + "mac: " + mac + "quantitatPortsEth: " + quantitatPortsEth + "zona_id: " + zona_id);

        await new Promise((resolve, reject) => {
            pool.query(
                'UPDATE Dispositius SET NomDispositiu = ?, deviceType = ?, ip = ?, mac = ?, zona_id = ?, quantitatPortsEth = ?, descripcio_dispositiu = ? WHERE id_dispositiu = ?',
                [NomDispositiu, deviceType, ip, mac, resultsZona, quantitatPortsEth, "test", id_dispositiu],
                (error, results) => {
                    if (error) {
                        handleDatabaseError(res, error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        res.status(200).json({ message: 'Record updated successfully' });
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ message: 'Error updating record', error });
    }
}
