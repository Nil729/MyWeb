import pool from "../../../../database/db.connection";

import getIdZona from "../getIdZona";
import getIdXarxa from "../xarxa/getIdXarxa";

export default async function updateDispositiu(req, res) {
    try {

        const { NomDispositiu, deviceType, ip, mac, quantitatPortsEth, zona_id, Id_vlan, id_dispositiu } = req.body;

        const resultsZona = await getIdZona(zona_id);
        const resultsXarxa = await getIdXarxa(Id_vlan);
        
        console.log("id_dispositiu: " + id_dispositiu + "Nom dipositiu" + NomDispositiu + "deviceType: " + deviceType + "ip: " + ip + "mac: " + mac + "quantitatPortsEth: " + quantitatPortsEth + "zona_id: " + zona_id + "Id_vlan: " + Id_vlan);

        await new Promise((resolve, reject) => {
            pool.query(
                'UPDATE Dispositius SET NomDispositiu = ?, deviceType = ?, ip = ?, mac = ?, zona_id = ?, Id_vlan = ?, quantitatPortsEth = ?, descripcio_dispositiu = ? WHERE id_dispositiu = ?',
                [NomDispositiu, deviceType, ip, mac, resultsZona, resultsXarxa, quantitatPortsEth, "test", id_dispositiu],
                (error, results) => {
                    if (error) {
                        reject(error);
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
