
import pool from "../../../../database/db.connection";

export default async function getIdDispositiu(id_dispositiu) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT  id_dispositiu, deviceType FROM Dispositius WHERE NomDispositiu = ?',
        [id_dispositiu],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log('results: ', results[0].id_dispositiu, results[0].deviceType);
            resolve(results);
          }
        }
      );
    });
  }