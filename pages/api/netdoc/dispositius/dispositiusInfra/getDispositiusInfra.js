
import pool from "../../../../../database/db.connection";
import { getSession } from 'next-auth/react';

export default async function getDispositiusInfra(req, res) {

    const session = await getSession({ req });
    //console.log(session.user.id);
    if (!session) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    pool.query(
        `SELECT NomDispositiu AS nomDispositiuInfraestructura 
            FROM Dispositius_infraestructura 
            JOIN Dispositius ON Dispositius_infraestructura.id_dispositiu_fk = Dispositius.id_dispositiu
            JOIN Zona on Id_zona = zona_id
            WHERE Zona.idUser_fk = ?;`,
        [session.user.id]

        , (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            } else {
                res.status(200).json(results);
            }
        }
    );

}