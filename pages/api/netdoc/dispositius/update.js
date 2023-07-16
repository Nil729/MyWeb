import pool from "../../../../database/db.connection";

export default async function updateDispositiu(req, res) {
    try {
        const { NomDispositiu, deviceType, ip, mac, quantitatPortsEth, zona_id, Id_vlan, id_dispositiu } = req.body;

        await new Promise((resolve, reject) => {
            pool.query(
                'UPDATE Dispositius SET NomDispositiu = ?, deviceType = ?, ip = ?, mac = ?, zona_id = ?, Id_vlan = ?, quantitatPortsEth = ?, descripcio_dispositiu = ? WHERE id_dispositiu = ?',
                [NomDispositiu, deviceType, ip, mac, zona_id, Id_vlan, quantitatPortsEth, "test", id_dispositiu],
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
