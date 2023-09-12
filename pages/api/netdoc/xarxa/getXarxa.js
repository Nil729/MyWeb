
import pool from "../../../../database/db.connection";

import { getSession } from 'next-auth/react';

export default async function getAllXarxes(req, res){

    const session = await getSession({ req });
    console.log("userId", session);
    
    if (!session) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    pool.query(
        `SELECT Id_vlan, Vid, NomXarxa, DescXarxa  FROM Xarxa WHERE idUser_fk = ?`, [session.user.id]

    , (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Error fetching records', error });
        } else {
            res.status(200).json(results);
        }
    });
}