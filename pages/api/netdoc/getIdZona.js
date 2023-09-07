import pool from "../../../database/db.connection";

export default async function getIdZona(sessionId, zona_id) {

  return new Promise((resolve, reject) => {

    pool.query(
      'SELECT Id_zona FROM Zona WHERE NomZona = ? and idUser_fk = ?',
      [zona_id, sessionId],
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