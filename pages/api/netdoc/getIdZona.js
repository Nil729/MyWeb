import pool from "../../../database/db.connection";


export default async function getIdZona(zona_id) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT Id_zona FROM Zona WHERE NomZona = ?',
        [zona_id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0].Id_zona);
          }
        }
      );
    });
  }