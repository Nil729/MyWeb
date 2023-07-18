
import pool from "../../../../database/db.connection";


export default function getAllXarxes(req, res){

    pool.query(
        `SELECT Id_vlan , NomXarxa , DescXarxa  FROM Xarxa`
    , (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Error fetching records', error });
        } else {
            res.status(200).json(results);
        }
    });
    

}