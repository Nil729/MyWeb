import pool from "../../../../database/db.connection";


export default async function insetXarxa(req, res) {

    const { sessionId, Id_vlan, NomXarxa, DescXarxa } = req.body;
    console.log("sessionId", sessionId);

    pool.query(
        `INSERT INTO Xarxa (Id_vlan , NomXarxa , DescXarxa, idUser_fk) VALUES (?,?,?,?)`, [Id_vlan, NomXarxa, DescXarxa, sessionId]
        , (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            } else {
                res.status(200).json(results);
            }
        }
    );
    
}
