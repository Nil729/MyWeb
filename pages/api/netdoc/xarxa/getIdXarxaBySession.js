import pool from "../../../../database/db.connection";



export default async function getIdXarxaBySession(nomXarxa, sessionId) {


    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT Id_vlan FROM Xarxa WHERE NomXarxa = ? and idUser_fk = ?',
            [nomXarxa, sessionId],
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

