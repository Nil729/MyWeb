
import getIdZona from '../../../api/netdoc/getIdZona.js';
import getIdXarxa from '../../../api/netdoc/xarxa/getIdXarxa.js';
import pool from '../../../../database/db.connection.js'


export default async function insertDispositiu(req, res) {
  try {
    // Get the session;

    const { NomDispositiu, deviceType, ip, mac, quantitatPortsEth, zona_id, sessionId } = req.body;

    const resultsZona = await getIdZona(sessionId, zona_id);
    //onst resultsXarxa = await getIdXarxa(Id_vlan);

    console.log(" idZona: " + resultsZona);

    // Insert the new device into the "Dispositius" table
    pool.query(
      'INSERT INTO Dispositius (  NomDispositiu, deviceType, ip, mac, zona_id, Id_vlan, quantitatPortsEth, descripcio_dispositiu) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)',
      [NomDispositiu, deviceType, ip, mac, resultsZona, 1, quantitatPortsEth, "test"],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Database error: ' + error.message });

          if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Error: No es pot inserir el dispositiu perque ja existeix un dispositiu amb la mateixa ip' });
          } else {
            return res.status(500).json({ error: 'Database error: ' + error.message });
          }
          
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
