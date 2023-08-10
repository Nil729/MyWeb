import pool from "../../../../database/db.connection";


export default function insetXarxa(req, res) {

    const { Id_vlan, NomXarxa, DescXarxa } = req.body;

    pool.query(
        `INSERT INTO Xarxa (Id_vlan , NomXarxa , DescXarxa) VALUES (?,?,?)`, [Id_vlan, NomXarxa, DescXarxa]
        , (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            } else {
                res.status(200).json(results);
            }
        }
    );
    
}
