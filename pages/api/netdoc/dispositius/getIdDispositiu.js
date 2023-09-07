
//pagues/api/netdoc/dispositius/getIdDispositiu.js
import pool from "../../../../database/db.connection";


export async function getIdDispositiu(id_dispositiu, sessionId) {
  console.log('id_dispositiu: ', id_dispositiu);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id_dispositiu, deviceType FROM Dispositius
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona 
        WHERE NomDispositiu = ? and Zona.idUser_fk = ?`,
      [id_dispositiu, sessionId],
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


export async function getIdDispositiuInfra(id_dispositiu, sessionId) {
  console.log('id_dispositiu: ', id_dispositiu);

  return new Promise((resolve, reject) => {
    pool.query(
      ` SELECT  
            id_dispositiuInfra, 
            deviceType 
          FROM Dispositius 
            JOIN Dispositius_infraestructura ON id_dispositiu = id_dispositiu_fk 
            JOIN Zona ON Dispositius.zona_id = Zona.Id_zona 
          WHERE NomDispositiu = ? and Zona.idUser_fk = ?`,
      [id_dispositiu, sessionId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log('results: ', results[0].id_dispositiuInfra, results[0].deviceType);
          resolve(results);
        }
      }
    );
  });
}


export async function getIdDispositiuFinal(id_dispositiu, sessionId) {
  console.log('id_dispositiu: ', id_dispositiu);
  return new Promise((resolve, reject) => {
    pool.query(
      ` SELECT
          id_disposituFinal,
          deviceType 
        FROM 
          Dispositius JOIN 
            Dispositus_final ON id_dispositiu = id_dispositiu_fk 
            JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
            WHERE NomDispositiu = ? and Zona.idUser_fk = ?`,
      [id_dispositiu, sessionId],

      (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log('results: ', results[0].id_disposituFinal, results[0].deviceType);
          resolve(results);
        }
      }
    );
  });
}