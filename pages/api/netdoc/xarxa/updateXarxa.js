import pool from "../../../../database/db.connection";


export default function updateXarxa(req, res) {

    const { Id_vlan, Vid, NomXarxa, DescXarxa } = req.body;
    console.log(Id_vlan, Vid, NomXarxa, DescXarxa);
    pool.query(
        `UPDATE Xarxa SET NomXarxa = ?, DescXarxa = ?,  Vid = ? WHERE Id_vlan = ?`, [NomXarxa, DescXarxa, Vid, Id_vlan]
        , (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            } else {
                res.status(200).json(results);
            }
        }
    );

}