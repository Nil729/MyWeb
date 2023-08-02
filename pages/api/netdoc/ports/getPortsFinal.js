import pool from "../../../../database/db.connection";

export default function getPortsFinal(req, res) {
    console.log("Entrant a getPortsFinal: " + req.query);
    const { nomDispositiuFinal } = req.query;
    
    pool.query(
        `SELECT quantitatPortsEth 
            FROM Dispositus_final
                JOIN Dispositius 
                ON Dispositus_final.id_dispositiu_fk = Dispositius.id_dispositiu 
                WHERE NomDispositiu = ?`,
        [nomDispositiuFinal]
        , (error, results) => {
            console
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            } else {

                console.log("Restultat de la sentencia: ", results);
                let arrEnablePorts = [];
                for (let i = 1; i <= results[0].quantitatPortsEth; i++) {
                    arrEnablePorts.push(i);
                }
                console.log("Array de ports: ", arrEnablePorts);
                res.status(200).json(arrEnablePorts);
            }
        }
    );
}