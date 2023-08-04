
import pool from "../../../../../database/db.connection";

export default function getDispositiusInfra(req, res) {

    pool.query(
        `SELECT NomDispositiu AS nomDispositiuInfraestructura FROM Dispositius_infraestructura 
            JOIN Dispositius ON Dispositius_infraestructura.id_dispositiu_fk = Dispositius.id_dispositiu`
        , (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            } else {
                res.status(200).json(results);
            }
        }
    );

}