import pool  from '../../../../database/db.connection.js'

export default function insertDispositiu(req, res) {
  const { NomDispositiu, deviceType, ip, mac, port, ubicacio, vlan } = req.body;

  // Insert the new device into the "Dispositius" table
  pool.query(
    'INSERT INTO Dispositius (NomDispositiu, deviceType, IP, MAC, zona_id, Id_vlan, QuantitatPortsEth, descripcio_dispositiu) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [NomDispositiu, deviceType, ip, mac, ubicacio, vlan, port, "test"],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error inserting new record', error });
      } else {
        res.status(201).json({ message: 'New record inserted successfully', id: results.insertId });
      }
    }
  );
}