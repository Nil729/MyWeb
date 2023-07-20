import pool from "../../../../database/db.connection";

export default function delXarxa(req, res) {
  console.log(req.query);
  const { networkId } = req.query;

  pool.query(
    `DELETE FROM Xarxa WHERE Id_vlan = ?`,
    [networkId],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error deleting record', error });
      } else {
        res.status(200).json({ message: 'Record deleted successfully' });
      }
    }
  );
}