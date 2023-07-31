import pool from "../../../../database/db.connection";

export default function getPortsInfra(req, res) {
    const { nomDipositiuInfra } = req.query;
    console.log("Nom del dispositiu: ", nomDipositiuInfra);
    
    pool.query(
        `SELECT quantitatPortsEth 
            FROM Dispositus_infraestructura 
                JOIN Dispositius 
                ON Dispositus_infraestructura.id_dispositiu_fk = Dispositius.id_dispositiu 
                WHERE NomDispositiu = ?`,
        [nomDipositiuInfra]
        , (error, results) => {
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

