import pool from '../../../../database/db.connection.js'

import getIdZona from '../../../api/netdoc/getIdZona.js';
import getIdXarxa from '../../../api/netdoc/xarxa/getIdXarxa.js';

export default async function insertDispositiu(req, res) {
  const { NomDispositiu, deviceType, ip, mac, quantitatPortsEth, zona_id, Id_vlan } = req.body;

  try {
    const resultsZona = await getIdZona(zona_id);
    const resultsXarxa = await getIdXarxa(Id_vlan);


    console.log("idxarxa: " + resultsXarxa + " idZona: " + resultsZona);
    // Insert the new device into the "Dispositius" table
    pool.query(
      'INSERT INTO Dispositius (NomDispositiu, deviceType, ip, mac, zona_id, Id_vlan, quantitatPortsEth, descripcio_dispositiu) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [NomDispositiu, deviceType, ip, mac, resultsZona, resultsXarxa, quantitatPortsEth, "test"],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: 'Error inserting new record', error });
        } else {
          res.status(201).json({ message: 'New record inserted successfully', id: results.insertId });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error });
  }
}

