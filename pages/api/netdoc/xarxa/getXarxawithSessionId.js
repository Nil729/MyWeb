import pool from "../../../../database/db.connection";

export default async function getXarxawithSessionId(Id_vlan, sessionId) {

    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT Id_vlan FROM Xarxa WHERE NomXarxa = ? and idUser_fk = ?',
            [Id_vlan, sessionId],
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