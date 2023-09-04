import pool from "../../../../database/db.connection";
import { getSession } from 'next-auth/react';

export default async function getDispositius(req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }


    // Proceed to fetch the data if the user is authorized
    pool.query(
      `SELECT id_dispositiu, ip, NomDispositiu, mac, quantitatPortsEth, deviceType, NomZona as zona_id, NomXarxa as Id_vlan
      FROM Dispositius 
      JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
      JOIN Xarxa ON Dispositius.Id_vlan = Xarxa.Id_vlan
      WHERE Zona.idUser_fk = ?;`,
      [session.user.id],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: 'Error fetching records', error });
        } else {
          res.status(200).json(results);
        }
      }
    );

  } catch (error) {

    res.status(500).json({ message: 'Error fetching records', error });

  }
}


