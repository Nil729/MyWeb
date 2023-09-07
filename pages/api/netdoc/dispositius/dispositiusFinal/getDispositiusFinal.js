import pool from "../../../../../database/db.connection";
import { getSession } from 'next-auth/react';

export default async function getDispositiusFinal(req, res) {
    const session = await getSession({ req });

    pool.query(
        `SELECT NomDispositiu AS nomDispositiuFinal, 
        deviceType 
        FROM Dispositius
            JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
            WHERE Zona.idUser_fk = ?
        order by NomDispositiu;`,
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