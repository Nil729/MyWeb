import pool from "../../../../database/db.connection";
import { getSession } from 'next-auth/react';

export default async function getPortsInfra(req, res) {
    const session = await getSession({ req });
    console.log(session.user.id);
    const { nomDipositiuInfra } = req.query;
    console.log("Nom del dispositiu: ", nomDipositiuInfra);
    
    pool.query(
        `SELECT quantitatPortsEth 
            FROM Dispositius_infraestructura 
                JOIN Dispositius 
                ON Dispositius_infraestructura.id_dispositiu_fk = Dispositius.id_dispositiu
                JOIN Zona ON Dispositius.zona_id = Zona.Id_zona 
                WHERE NomDispositiu = ? AND Zona.idUser_fk = ?`,
        [nomDipositiuInfra, session.user.id]
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

