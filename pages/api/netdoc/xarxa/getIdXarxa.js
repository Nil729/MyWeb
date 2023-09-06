import pool from "../../../../database/db.connection";
import { getSession } from 'next-auth/react';


export default async function getIdXarxa(Id_vlan) {

    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT Id_vlan FROM Xarxa WHERE NomXarxa = ? and idUser_fk = ?',
            [Id_vlan, session.user.id],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0].Id_vlan);
                }
            }
        );
    });
}