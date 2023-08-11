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
