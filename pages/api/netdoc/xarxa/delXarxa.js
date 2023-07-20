import pool from "../../../../database/db.connection";

export default function delXarxa(req, res) {

    const { Id_vlan } = req.body;
    console.log(Id_vlan);
    
    pool.query(
        `DELETE FROM Xarxa WHERE Id_vlan = ?`, [Id_vlan]
        , (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            } else {
                res.status(200).json(results);
            }
        }
    );


}