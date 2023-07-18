import pool from "../../../../database/db.connection";

export default function getDispositius(req, res) {

    pool.query(`select id_dispositiu, ip, NomDispositiu, mac, quantitatPortsEth, deviceType, NomZona as zona_id, NomXarxa as Id_vlan
        from Dispositius 
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        JOIN Xarxa ON Dispositius.Id_vlan = Xarxa.Id_vlan`
    , (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Error fetching records', error });
        } else {
            res.status(200).json(results);
        }
    });
}