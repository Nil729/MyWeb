import pool from "../../../../database/db.connection";
import { handleDatabaseError } from '../../apiUtils/databaseUtils.js';

export default async function insetXarxa(req, res) {
    try{
        const { sessionId, Vid, NomXarxa, DescXarxa } = req.body;
        console.log("sessionId", sessionId);
    
        pool.query(
            `INSERT INTO Xarxa (Vid , NomXarxa , DescXarxa, idUser_fk) VALUES (?,?,?,?)`, [Vid, NomXarxa, DescXarxa, sessionId]
            , (error, results) => {
                if (error) {
                    handleDatabaseError(res, error);
                } else {
                    res.status(200).json(results);
                }
            }
        );
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error processing request' });
    }
}