-- Active: 1687107432916@@127.0.0.1@3306@bbdd_NetDoc


select `NomDispositiu`, numPortInfra
    from `Coneccio`
    JOIN `PortsInfra` ON `IdPortInfra_fk` = `IdPortInfra`
    JOIN `Dispositius_infraestructura` ON `id_dispositiuInfra_fk` = `id_dispositiuInfra`
    JOIN `Dispositius` ON `id_dispositiu_fk` = `id_dispositiu`;


SELECT `NomDispositiu`, numPortFinal
    FROM `Coneccio`
    JOIN `PortsFinal` ON `IdPortFinal_fk` = `IdPortFinal`
    JOIN `Dispositus_final` ON `id_disposituFinal_fk` = `id_disposituFinal`
    JOIN `Dispositius` ON `id_dispositiu_fk` = `id_dispositiu`;

SELECT 
    (SELECT `NomDispositiu` 
     FROM `Dispositius` 
     WHERE `id_dispositiu` = `Dispositius_infraestructura`.`id_dispositiu_fk`) AS `Dispositiu_Infraestructura`,
    `PortsInfra`.`numPortInfra` AS `Parent Port`,
    `NomXarxa`,
    VlanConfig,
    (SELECT `NomDispositiu` 
     FROM `Dispositius` 
     WHERE `id_dispositiu` = `Dispositus_final`.`id_dispositiu_fk`) AS `Dispositiu_Final`,
    `PortsFinal`.`numPortFinal` AS `Child Port`
FROM
    `Coneccio`
JOIN
    `PortsInfra` ON `Coneccio`.`IdPortInfra_fk` = `PortsInfra`.`IdPortInfra`
JOIN 
    `Estat` ON `PortsInfra`.`IdPortInfra` = `Estat`.`IdPortInfra_fk`
JOIN 
    `Xarxa` ON `Estat`.`Id_vlan_fk` = `Xarxa`.`Id_vlan`
JOIN
    `Dispositius_infraestructura` ON `PortsInfra`.`id_dispositiuInfra_fk` = `Dispositius_infraestructura`.`id_dispositiuInfra`
JOIN
    `PortsFinal` ON `Coneccio`.`IdPortFinal_fk` = `PortsFinal`.`IdPortFinal`
JOIN
    `Dispositus_final` ON `PortsFinal`.`id_disposituFinal_fk` = `Dispositus_final`.`id_disposituFinal`;


SELECT 
        (SELECT NomDispositiu 
     FROM Dispositius 
     WHERE id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk) AS Dispositiu_Infraestructura,
    PortsInfra.numPortInfra AS Parent Port,
    NomXarxa,
    VlanConfig
    -- get name Dispositius_infraestructura AS DispositiuInfraChild
    -- get child ports from DispositiuInfraChild
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
    Dispositius_infraestructura AS DispositiuInfraChild ON PortsInfraChild.id_dispositiuInfra_fk = DispositiuInfraChild.id_dispositiuInfra;

SELECT 
    (SELECT NomDispositiu 
     FROM Dispositius 
     WHERE id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk) AS Dispositiu_Infraestructura,
    PortsInfra.numPortInfra AS Port_Dispositiu_Infraestructura,
    (SELECT NomDispositiu 
     FROM Dispositius 
     WHERE id_dispositiu = Dispositus_final.id_dispositiu_fk) AS Dispositiu_Final,
    PortsFinal.numPortFinal AS Port_Dispositiu_Final
FROM
    Coneccio
JOIN
    PortsInfra ON Coneccio.IdPortInfra_fk = PortsInfra.IdPortInfra
JOIN
    Dispositius_infraestructura ON PortsInfra.id_dispositiuInfra_fk = Dispositius_infraestructura.id_dispositiuInfra
JOIN
    PortsFinal ON Coneccio.IdPortFinal_fk = PortsFinal.IdPortFinal
JOIN
    Dispositus_final ON PortsFinal.id_disposituFinal_fk = Dispositus_final.id_disposituFinal;

            SELECT 
                idConneccio,
                (SELECT NomDispositiu 
                FROM Dispositius 
                WHERE id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk) AS infraDeviceName,
                PortsInfra.numPortInfra AS portInfra,
                NomXarxa AS vlan,
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
            UNION
            SELECT 
                IdConexioTrunk,
                -- Get parent Dispositiu_Infraestructura name
                (SELECT NomDispositiu 
                FROM Dispositius 
                WHERE id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk) AS infraDeviceName,
                -- Parent Port
                PortsInfra.numPortInfra AS portInfra,
                -- Network Name (NomXarxa) and VlanConfig
                NomXarxa AS vlan,
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
                Dispositius_infraestructura AS DispositiuInfraChild ON PortsInfraChild.id_dispositiuInfra_fk = DispositiuInfraChild.id_dispositiuInfra;

SELECT 
    idConneccio ,
    (SELECT NomDispositiu 
    FROM Dispositius 
    WHERE id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk) AS infraDeviceName,
    PortsInfra.numPortInfra AS portInfra,
    GROUP_CONCAT(NomXarxa ORDER BY NomXarxa ASC SEPARATOR ', ') AS vlan, -- Concatenación de VLANs
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
GROUP BY
    idConneccio,
    InfraDeviceName,
    InfraPort,
    PortStatus,
    FinalDeviceName,
    EndPort
UNION
SELECT 
    IdConexioTrunk,
    -- Get parent Dispositiu_Infraestructura name
    (SELECT NomDispositiu 
    FROM Dispositius 
    WHERE id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk) AS infraDeviceName,
    -- Parent Port
    PortsInfra.numPortInfra AS portInfra,
    GROUP_CONCAT(NomXarxa ORDER BY NomXarxa ASC SEPARATOR ', ') AS vlan, -- Concatenación de VLANs
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
GROUP BY
    ConnectionID,
    InfraDeviceName,
    InfraPort,
    PortStatus,
    FinalDeviceName,
    endPort;


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
    WHERE Xarxa.idUser_fk = 3
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
    WHERE Xarxa.idUser_fk = 3
    GROUP BY
        IdConexioTrunk,
        infraDeviceName, -- Match the alias name
        portInfra,       -- Match the alias name
        portStatus,
        finalDeviceName, -- Match the alias name
        endPort;