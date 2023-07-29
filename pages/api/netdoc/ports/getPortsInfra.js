import pool from "../../../../database/db.connection";

export default function getPortsInfra(req, res) {
    const { nomDipositiu } = req.query;
    pool.query(
        `SELECT quantitatPortsEth 
            FROM Dispositus_infraestructura 
                JOIN Dispositius 
                ON Dispositus_infraestructura.id_dispositiu_fk = Dispositius.id_dispositiu 
                WHERE NomDispositiu = ?`,
        [nomDipositiu]
        , (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            } else {
                res.status(200).json(results);
            }
        }
    );

}