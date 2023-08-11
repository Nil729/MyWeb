
import pool from "../../../../database/db.connection";

export async function getIdDispositiu(id_dispositiu) {
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

export async function getIdDispositiuInfra(id_dispositiu) {
  console.log('id_dispositiu: ', id_dispositiu);
  return new Promise((resolve, reject) => {
    pool.query(
      ` SELECT  
            id_dispositiuInfra, 
            deviceType 

          FROM Dispositius JOIN 
            Dispositius_infraestructura ON id_dispositiu = id_dispositiu_fk 

          WHERE NomDispositiu = ?`,
      [id_dispositiu],
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


export  async function getIdDispositiuFinal(id_dispositiu) {
  return new Promise((resolve, reject) => {
    pool.query(
      ` SELECT
          id_disposituFinal,
          deviceType 
        FROM 
          Dispositius JOIN 
            Dispositus_final ON id_dispositiu = id_dispositiu_fk 
            WHERE NomDispositiu = ?`,
      [id_dispositiu],
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