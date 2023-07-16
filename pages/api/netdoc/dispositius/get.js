
import pool from "../../../../database/db.connection";

export default function getDispositius(req, res) {

    pool.query('SELECT * FROM Dispositius', (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Error fetching records', error });
        } else {
            res.status(200).json(results);
        }
    });
}