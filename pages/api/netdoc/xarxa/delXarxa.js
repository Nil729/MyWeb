import pool from "../../../../database/db.connection";
import getIdXarxa from "./getIdXarxa";

export default async function delXarxa(req, res) {
  console.log(req.query);
  const { xarxaId } = req.query;

  //const networkId = await getIdXarxa(nomXarxa);

  pool.query(
    `DELETE FROM Xarxa WHERE Id_vlan = ?`,
    [xarxaId],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error deleting record', error });
      } else {
        res.status(200).json({ message: 'Record deleted successfully' });
      }
    }
  );
}