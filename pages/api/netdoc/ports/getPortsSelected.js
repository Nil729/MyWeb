import pool from "../../../../database/db.connection";
import { getSession } from 'next-auth/react';


export default function getSelectedPorts(req, res) {
    const { nomDipositiuInfra } = req.query;
    //const session = getSession({ req });
    console.log("Entrant a getSelectedPorts: " + nomDipositiuInfra);
    pool.query(

        `SELECT 
        D.NomDispositiu,
        CASE 
            WHEN D.deviceType LIKE 'infra' THEN PI.numPortInfra 
            ELSE PF.numPortFinal 
        END AS numPortInfra
    FROM Dispositius D
    JOIN Zona ON D.zona_id = Zona.Id_zona
    LEFT JOIN (
        SELECT 
            DI.id_dispositiu_fk,
            GROUP_CONCAT(PI.numPortInfra) AS numPortInfra
        FROM PortsInfra PI
        JOIN Dispositius_infraestructura DI ON PI.id_dispositiuInfra_fk = DI.id_dispositiuInfra
        GROUP BY DI.id_dispositiu_fk
    ) PI ON D.id_dispositiu = PI.id_dispositiu_fk
    LEFT JOIN (
        SELECT 
            DF.id_dispositiu_fk,
            GROUP_CONCAT(PF.numPortFinal) AS numPortFinal
        FROM PortsFinal PF
        JOIN Dispositus_final DF ON PF.id_disposituFinal_fk = DF.id_disposituFinal
        GROUP BY DF.id_dispositiu_fk
    ) PF ON D.id_dispositiu = PF.id_dispositiu_fk
    WHERE D.NomDispositiu = 'Ruter' and Zona.idUser_fk = 3;`, 
        [nomDipositiuInfra],
        (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            }
            else {
                console.log("Restultat de la sentencia: ", results[0].numPortInfra);
                var numPortInfra = results[0].numPortInfra;
                if (numPortInfra != null) {
                    var arrayPorts = numPortInfra.split(",").map(Number);
                    console.log("Array de ports: ", arrayPorts);
                }
                res.status(200).json(arrayPorts);
            }
        }
    );
}