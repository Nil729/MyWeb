import pool from "../../../../database/db.connection";



export default async function getXarxawithoutSessionId(Id_vlan) {

    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT Id_vlan FROM Xarxa WHERE NomXarxa = ?',
            [Id_vlan],
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