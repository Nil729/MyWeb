
import pool from "../../../../database/db.connection";
import {getIdDispositiu} from "../dispositius/getIdDispositiu";
import { getSession } from "next-auth/react";

export default async function getXarxaFromPortInfra(req, res){
    const session = await getSession({ req });
    console.log('session: ', session);

    const { nomDispositiuInfraestructura , portInfra } = req.query;
    console.log(nomDispositiuInfraestructura, portInfra );


    const idDispositiu = await getIdDispositiu(nomDispositiuInfraestructura, session.user.id);
    //[ { id_dispositiu: 41, deviceType: 'Infra' } ]


    console.log('getIdDispositiu: ', idDispositiu, 'session: ', session.user.id);
    
    pool.query(
        `
        SELECT Id_vlan, NomXarxa, DescXarxa  
        FROM Xarxa
        WHERE Id_vlan IN (
            SELECT Id_vlan_fk 
            FROM Estat 
            WHERE IdPortInfra_fk = (
                SELECT COALESCE(IdPortInfraParent_fk, 0)
                FROM ConexioTrunk 
                WHERE IdPortInfraChild_fk IN (
                    SELECT IdPortInfra 
                    FROM PortsInfra  
                    JOIN Dispositius_infraestructura 
                    ON id_dispositiuInfra = id_dispositiuInfra_fk 
                    WHERE id_dispositiu_fk = ?
                )
            )
        ) OR NOT EXISTS (
            SELECT 1
            FROM ConexioTrunk 
            WHERE IdPortInfraChild_fk IN (
                SELECT IdPortInfra 
                FROM PortsInfra  
                JOIN Dispositius_infraestructura 
                ON id_dispositiuInfra = id_dispositiuInfra_fk 
                WHERE id_dispositiu_fk = ?
            )
        ) and idUser_fk = ? ;
        `
        , [idDispositiu[0].id_dispositiu, idDispositiu[0].id_dispositiu, session.user.id]

    , (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Error fetching records', error });
        } else {
            res.status(200).json(results);
        }
    });
    

}