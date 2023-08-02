import pool from "../../../../../database/db.connection";


export default async function getDispositiusFinal(req, res) {

    pool.query(
        `SELECT NomDispositiu AS nomDispositiuFinal FROM Dispositus_final 
        JOIN Dispositius ON  Dispositus_final.id_dispositiu_fk = Dispositius.id_dispositiu`
        , (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            } else {
                res.status(200).json(results);
            }
        }
    );
}