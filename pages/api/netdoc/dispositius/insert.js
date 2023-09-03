
import getIdZona from '../../../api/netdoc/getIdZona.js';
import getIdXarxa from '../../../api/netdoc/xarxa/getIdXarxa.js';
import pool from '../../../../database/db.connection.js'

export default async function insertDispositiu(req, res) {
  try {
    const {idUser, NomDispositiu, deviceType, ip, mac, quantitatPortsEth, zona_id} = req.body;


    const resultsZona = await getIdZona(zona_id);
    //onst resultsXarxa = await getIdXarxa(Id_vlan);

    console.log(" idZona: " + resultsZona);
    
    // Insert the new device into the "Dispositius" table
    pool.query(
      'INSERT INTO Dispositius (  NomDispositiu, deviceType, ip, mac, zona_id, Id_vlan, quantitatPortsEth, descripcio_dispositiu, idUser_fk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [NomDispositiu, deviceType, ip, mac, resultsZona, 1, quantitatPortsEth, "test", idUser],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: 'Error inserting new record', error });
        } else {
          res.status(201).json({ message: 'New record inserted successfully', id: results.insertId });
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
}
