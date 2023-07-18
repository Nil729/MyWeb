
import pool from "../../../../database/db.connection";


export default function deleteDispositiu(req, res) {
    const { id_dispositiu } = req.query;
    console.log("id: " + id_dispositiu);
    pool.query(
        'DELETE FROM Dispositius WHERE id_dispositiu = ?',
        [id_dispositiu],
        (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error deleting record', error });
            } else {
                res.status(200).json({ message: 'Record deleted successfully' });
            }
        }
    );
}