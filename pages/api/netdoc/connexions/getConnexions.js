import pool from "../../../../database/db.connection";
import { getSession } from 'next-auth/react';

export default async function getConnexions(req, res) {
    const session  = await getSession({ req });
    console.log('session: ', session);

    pool.query(
        `
        SELECT 
        idConneccio,
        (SELECT NomDispositiu 
        FROM Dispositius 
        WHERE id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk) AS infraDeviceName,
        PortsInfra.numPortInfra AS portInfra,
        GROUP_CONCAT(NomXarxa ORDER BY NomXarxa ASC SEPARATOR ', ') AS vlan,
        VlanConfig AS portStatus,
        (SELECT NomDispositiu 
        FROM Dispositius 
        WHERE id_dispositiu = Dispositus_final.id_dispositiu_fk) AS finalDeviceName,
        PortsFinal.numPortFinal AS endPort
    FROM
        Coneccio
    JOIN
        PortsInfra ON Coneccio.IdPortInfra_fk = PortsInfra.IdPortInfra
    JOIN 
        Estat ON PortsInfra.IdPortInfra = Estat.IdPortInfra_fk
    JOIN 
        Xarxa ON Estat.Id_vlan_fk = Xarxa.Id_vlan
    JOIN
        Dispositius_infraestructura ON PortsInfra.id_dispositiuInfra_fk = Dispositius_infraestructura.id_dispositiuInfra
    JOIN
        PortsFinal ON Coneccio.IdPortFinal_fk = PortsFinal.IdPortFinal
    JOIN
        Dispositus_final ON PortsFinal.id_disposituFinal_fk = Dispositus_final.id_disposituFinal    
    WHERE Xarxa.idUser_fk = ?
    GROUP BY
        idConneccio,
        infraDeviceName, -- Match the alias name
        portInfra,       -- Match the alias name
        portStatus,
        finalDeviceName, -- Match the alias name
        endPort
    UNION
    SELECT 
        IdConexioTrunk,
        -- Get parent Dispositiu_Infraestructura name
        (SELECT NomDispositiu 
        FROM Dispositius 
        WHERE id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk) AS infraDeviceName,
        -- Parent Port
        PortsInfra.numPortInfra AS portInfra,
        GROUP_CONCAT(NomXarxa ORDER BY NomXarxa ASC SEPARATOR ', ') AS vlan,
        VlanConfig AS portStatus,
        -- Get child Dispositiu_Infraestructura name
        (SELECT NomDispositiu 
        FROM Dispositius 
        WHERE id_dispositiu = DispositiuInfraChild.id_dispositiu_fk) AS finalDeviceName,
        -- Child ports from DispositiuInfraChild
        PortsInfraChild.numPortInfra AS endPort
    FROM
        ConexioTrunk
    JOIN
        PortsInfra ON ConexioTrunk.IdPortInfraParent_fk = PortsInfra.IdPortInfra
    JOIN 
        Estat ON PortsInfra.IdPortInfra = Estat.IdPortInfra_fk
    JOIN 
        Xarxa ON Estat.Id_vlan_fk = Xarxa.Id_vlan
    JOIN
        Dispositius_infraestructura ON PortsInfra.id_dispositiuInfra_fk = Dispositius_infraestructura.id_dispositiuInfra
    JOIN
        PortsInfra AS PortsInfraChild  ON ConexioTrunk.IdPortInfraChild_fk = PortsInfraChild.IdPortInfra
    JOIN
        Dispositius_infraestructura AS DispositiuInfraChild ON PortsInfraChild.id_dispositiuInfra_fk = DispositiuInfraChild.id_dispositiuInfra
    WHERE Xarxa.idUser_fk = ?
    GROUP BY
        IdConexioTrunk,
        infraDeviceName, -- Match the alias name
        portInfra,       -- Match the alias name
        portStatus,
        finalDeviceName, -- Match the alias name
        endPort;
    
        `,
        [session.user.id, session.user.id]
        , (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error fetching records', error });
            } else {
                res.status(200).json(results);
            }
        }
    );

}
