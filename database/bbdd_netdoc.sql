-- Active: 1687107432916@@127.0.0.1@3306@bbdd_NetDoc

CREATE DATABASE bbdd_NetDoc;

CREATE TABLE Dispositius (
    id_dispositiu INTEGER PRIMARY KEY AUTO_INCREMENT,
    ip VARCHAR(15) UNIQUE,
    NomDispositiu VARCHAR (25) UNIQUE,
    mac TEXT,
    zona_id INTEGER,
    Id_vlan INTEGER,
    quantitatPortsEth INTEGER,
    descripcio_dispositiu TEXT,
    deviceType TEXT,
    FOREIGN KEY(zona_id) REFERENCES Zona(Id_zona) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(Id_vlan) REFERENCES Xarxa(Id_vlan)ON UPDATE CASCADE ON DELETE CASCADE
);


-- cavia els noms de les columents IP i MAC perque siguin minusculas
ALTER TABLE Dispositius CHANGE IP ip VARCHAR(15) UNIQUE;
ALTER TABLE Dispositius CHANGE QuantitatPortsEth quantitatPortsEth TEXT;

-- change the constraint forenkey to cascade
ALTER TABLE Dispositius DROP FOREIGN KEY `dispositius_ibfk_2`;
ALTER TABLE Dispositius ADD FOREIGN KEY(zona_id) REFERENCES Zona(Id_zona) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Dispositius DROP FOREIGN KEY `dispositius_ibfk_1`;
ALTER TABLE Dispositius ADD FOREIGN KEY(Id_vlan) REFERENCES Xarxa(Id_vlan)ON UPDATE CASCADE ON DELETE CASCADE;


-- Canvia perque el tipus de dispositu sigui TEXT
ALTER TABLE Dispositius MODIFY COLUMN deviceType TEXT;

SELECT * FROM Dispositius;

DROP TABLE Dispositius;

CREATE TABLE PortsFinal (
    IdPortFinal INTEGER PRIMARY KEY AUTO_INCREMENT,
    numPortFinal INTEGER,
    pachpanelFinal INTEGER,
    id_disposituFinal_fk INTEGER,
    FOREIGN KEY(id_disposituFinal_fk) REFERENCES Dispositus_final(id_disposituFinal) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE `PortsFinal` ADD UNIQUE (numPortFinal);
select * from `Dispositus_final`
select * from PortsFinal;
DROP TABLE PortsFinal;

-- change the constraint forenkey to cascade
ALTER TABLE PortsFinal ADD FOREIGN KEY(id_disposituFinal_fk) REFERENCES Dispositus_final(id_disposituFinal) ON UPDATE CASCADE ON DELETE CASCADE;


CREATE TABLE PortsInfra (
    IdPortInfra INTEGER PRIMARY KEY AUTO_INCREMENT, -- ha de ser menor o igual a la quantitat de ports del dispositu
    EstatPOE TEXT,
    EstatXarxa TEXT,
    id_dispositiuInfra_fk INTEGER,
    numPortInfra INTEGER UNIQUE,
    pachpanelInfra TEXT,
    FOREIGN KEY(id_dispositiuInfra_fk) REFERENCES Dispositius_infraestructura(id_dispositiuInfra) ON UPDATE CASCADE ON DELETE CASCADE,
);

--  Quit PortsInfra UNIQUE (numPortInfra);
ALTER TABLE PortsInfra DROP INDEX numPortInfra;

ALTER TABLE PortsInfra MODIFY COLUMN numPortInfra INTEGER;

DROP TABLE PortsInfra;
-- change the constraint forenkey to cascade
ALTER TABLE PortsInfra DROP FOREIGN KEY `portsinfra_ibfk_5`;
ALTER TABLE PortsInfra ADD FOREIGN KEY(id_dispositiuInfra_fk) REFERENCES Dispositius_infraestructura(id_dispositiuInfra) ON UPDATE CASCADE ON DELETE CASCADE;
-- DELETE A FOREIGN KEY(Id_vlan_fk) REFERENCES Xarxa(Id_vlan) ON UPDATE CASCADE ON DELETE CASCADE
ALTER TABLE PortsInfra DROP FOREIGN KEY PortsInfra_ibfk_5;
ALTER TABLE PortsInfra DROP COLUMN Id_vlan_fk;


CREATE TABLE Dispositius_infraestructura (
    id_dispositiuInfra INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_dispositiu_fk INTEGER,
    numPortsInfra INTEGER,
    FOREIGN KEY(id_dispositiu_fk) REFERENCES Dispositius(id_dispositiu) ON UPDATE CASCADE ON DELETE CASCADE
);
select * from Dispositu;
SELECT * FROM Dispositius_infraestructura;
ALTER TABLE Dispositius_infraestructura ADD FOREIGN KEY(id_dispositiu_fk) REFERENCES Dispositius(id_dispositiu) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE Dispositus_final (
    id_disposituFinal INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_dispositiu_fk INTEGER,
    FOREIGN KEY(id_dispositiu_fk) REFERENCES Dispositius(id_dispositiu) ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE Dispositus_final ADD FOREIGN KEY(id_dispositiu_fk) REFERENCES Dispositius(id_dispositiu) ON UPDATE CASCADE ON DELETE CASCADE;

select * from `Dispositus_final`;

DROP TABLE Dispositus_final;

CREATE TABLE Zona (
    Id_zona INTEGER PRIMARY KEY AUTO_INCREMENT,
    NomZona VARCHAR(25) UNIQUE,
    DescZona TEXT
);

DROP TABLE Zona;

CREATE TABLE Xarxa (
    Id_vlan INTEGER PRIMARY KEY AUTO_INCREMENT,
    NomXarxa VARCHAR(25) UNIQUE,
    DescXarxa TEXT
);

ALTER TABLE Xarxa MODIFY COLUMN NomXarxa VARCHAR(25) UNIQUE;

DROP TABLE Xarxa;

CREATE TABLE Coneccio (
    idConneccio INTEGER PRIMARY KEY AUTO_INCREMENT,
    IdPortFinal_fk INTEGER UNIQUE,
    IdPortInfra_fk INTEGER UNIQUE,
    Poe TEXT,
    XarxaEstat TEXT,
    IdPort INTEGER,

    FOREIGN KEY(IdPortFinal_fk) REFERENCES PortsFinal(IdPortFinal) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(IdPortInfra_fk) REFERENCES PortsInfra(IdPortInfra)  ON UPDATE CASCADE ON DELETE CASCADE
);

-- Add a idConneccio 
ALTER TABLE Coneccio ADD COLUMN idConneccio INTEGER PRIMARY KEY AUTO_INCREMENT;

-- change the constraint forenkey to cascade
ALTER TABLE Coneccio DROP FOREIGN KEY `coneccio_ibfk_2`;
ALTER TABLE Coneccio ADD FOREIGN KEY(IdPortFinal_fk) REFERENCES PortsFinal(IdPortFinal) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Coneccio DROP FOREIGN KEY `coneccio_ibfk_1`;
ALTER TABLE Coneccio ADD FOREIGN KEY(IdPortInfra_fk) REFERENCES PortsInfra(IdPortInfra) ON UPDATE CASCADE ON DELETE CASCADE;

#modifica la taula perque el IdPortFinal_fk i el IdPortInfra_fk perque siguin unique i eliminar el camp xPort
Alter TABLE Coneccio DROP COLUMN xPort;

ALTER TABLE Coneccio ADD UNIQUE (IdPortFinal_fk, IdPortInfra_fk);

-- change the constraint forenkey to cascade
ALTER TABLE Coneccio DROP FOREIGN KEY `coneccio_ibfk_2`;
ALTER TABLE Coneccio ADD FOREIGN KEY(IdPortFinal_fk) REFERENCES PortsFinal(IdPortFinal) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Coneccio DROP FOREIGN KEY `coneccio_ibfk_1`;
ALTER TABLE Coneccio ADD FOREIGN KEY(IdPortInfra_fk) REFERENCES PortsInfra(IdPortInfra) ON UPDATE CASCADE ON DELETE CASCADE;



#recursivitat connexió per poder connectar entre ports de infraestructura

CREATE TABLE ConexioTrunk (
    IdConexioTrunk INTEGER PRIMARY KEY AUTO_INCREMENT,
    IdPortInfraParent_fk INTEGER UNIQUE,
    IdPortInfraChild_fk INTEGER UNIQUE,
    FOREIGN KEY(IdPortInfraParent_fk) REFERENCES PortsInfra(IdPortInfra) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(IdPortInfraChild_fk) REFERENCES PortsInfra(IdPortInfra) ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE ConexioTrunk ADD UNIQUE (IdPortInfraParent_fk, IdPortInfraChild_fk);

DROP TABLE Coneccio;


-- change the constraint forenkey to cascade
ALTER TABLE ConexioTrunk DROP FOREIGN KEY `conexiotrunk_ibfk_2`;
ALTER TABLE ConexioTrunk ADD FOREIGN KEY(IdPortInfraParent_fk) REFERENCES PortsInfra(IdPortInfra) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ConexioTrunk DROP FOREIGN KEY `conexiotrunk_ibfk_1`;
ALTER TABLE ConexioTrunk ADD FOREIGN KEY(IdPortInfraChild_fk) REFERENCES PortsInfra(IdPortInfra) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE Estat (
    IdPortInfra_fk INTEGER UNIQUE,
    Id_vlan_fk INTEGER,
    VlanConfig TEXT,
    Connectat BOOLEAN,
    FOREIGN KEY(IdPortInfra_fk) REFERENCES PortsInfra(IdPortInfra) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(Id_vlan_fk) REFERENCES Xarxa(Id_vlan) ON UPDATE CASCADE ON DELETE CASCADE
);
-- Change Connectat data type to boolean
ALTER TABLE Estat MODIFY COLUMN Connectat BOOLEAN;
-- change the constraint forenkey to cascade
ALTER TABLE Estat DROP FOREIGN KEY `estat_ibfk_2`;
ALTER TABLE Estat ADD FOREIGN KEY(IdPortInfra_fk) REFERENCES PortsInfra(IdPortInfra) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Estat DROP FOREIGN KEY `estat_ibfk_1`;
ALTER TABLE Estat ADD FOREIGN KEY(Id_vlan_fk) REFERENCES Xarxa(Id_vlan) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Estat ADD UNIQUE (    IdPortInfra_fk);
DROP TABLE Estat;
SELECT * from `Estat`;

# inserta a la base de dades un dispositu

INSERT INTO Dispositius (IP, NomDispositiu, MAC, zona_id, Id_vlan, QuantitatPortsEth, descripcio_dispositiu, deviceType) 
VALUES ('192.168.1.1', 'pc-oriol', '00:00:00:00:00:00', 1, 1, 4, 'MAIN RUTER', false);

INSERT INTO Dispositius (id_dispositiu, IP, NomDispositiu, MAC, zona_id, Id_vlan, QuantitatPortsEth, descripcio_dispositiu)
VALUES (2, '192.168.10.100', 'SWITCH', '00:00:00:00:00:00', 1, 2, 24, 'MAIN SWITCH');

INSERT INTO Dispositius (id_dispositiu, IP, NomDispositiu, MAC, zona_id, Id_vlan, QuantitatPortsEth, descripcio_dispositiu)
VALUES (3, '192.168.10.102', 'PC1', '00:00:00:00:00:00', 2, 3, 1, 'PC OFICINES');

INSERT INTO Dispositius (id_dispositiu, IP, NomDispositiu, MAC, zona_id, Id_vlan, QuantitatPortsEth, descripcio_dispositiu)
VALUES (4, '192.168.10.103', 'PC2', '00:00:00:00:00:00', 3, 4, 1, 'PC PORDUCCIÓ');


select `NomDispositiu`, `Id_zona`, `NomZona` from Dispositius join Zona on Dispositius. zona_id = Zona.Id_zona;

UPDATE Dispositius 
SET NomDispositiu = 'Firewall', deviceType = 'Infra', ip = '192.168.10.70', mac = 'AA:BB:CC:DD:EE:FF', zona_id = 3, Id_vlan = 1, quantitatPortsEth = '24', descripcio_dispositiu = 'test' 
WHERE id_dispositiu = 51;

INSERT INTO `Dispositius` (`IP`, `NomDispositiu`, `MAC`, `zona_id`, `Id_vlan`, `QuantitatPortsEth`, `descripcio_dispositiu`, `deviceType`)
VALUES ('192.168.10.45', 'Ruter',  'AA:BB:CC:DD:EE:FF', 3, 1,  24, 'test', 'Infra' );


select * from Zona;
SELECT Id_zona FROM Zona WHERE NomZona =  'Aula 32';


# inserta a la base de dades una zona

INSERT INTO Zona (Id_zona,NomZona, DescZona) VALUES (1, 'INFRA', 'INFRAESTRUCTURA');

INSERT INTO Zona (Id_zona, NomZona, DescZona) VALUES (2, 'OFICINES', 'OFICINES');

INSERT INTO Zona (Id_zona, NomZona, DescZona) VALUES (3, 'PORDUCCIÓ', 'PRODUCCIÓ');


# inserta a la base de dades una xarxa 

INSERT INTO Xarxa (Id_vlan, NomXarxa, DescXarxa) VALUES (1, 'V_infra', 'V_infra');
INSERT INTO Xarxa (Id_vlan, NomXarxa, DescXarxa) VALUES (2, 'V_officines', 'V_officines');
INSERT INTO Xarxa (Id_vlan, NomXarxa, DescXarxa) VALUES (3, 'V_producció', 'V_producció');

SELECT * FROM Xarxa;

# inserta a la base de dades dispositus de la infraestructura
SELECT * from Dispositius_infraestructura;
INSERT INTO Dispositius_infraestructura (id_dispositiu_fk) VALUES (1);

INSERT INTO Dispositius_infraestructura (id_dispositiu_fk) VALUES (2);

# inserta a la base de dades un dispositu final
INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (3);

INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (4);

SELECT * FROM Dispositus;
# inserta a la base de dades un port final

INSERT INTO PortsFinal (`IdPortFinal`, numPort id_disposituFinal_fk) VALUES (1, 3);

INSERT INTO PortsFinal (IdPortFinal, numPort id_disposituFinal_fk) VALUES (3, 4);

SELECT * FROM PortsFinal;

# inserta a la base de dades una connexio dispositu infra (PC-1) a dispositu final (RUTER)
INSERT INTO Coneccio (IdPortFinal_fk, IdPortInfra_fk, Poe, XarxaEstat, IdPort, pachpanel) VALUES (1, 4, 'POE', 'UP', 1, 1);

# inserta a la base de dades una connexio dispositu infra (PC-2) a dispositu final (SWITCH)
INSERT INTO Coneccio (IdPortFinal_fk, IdPortInfra_fk, Poe, XarxaEstat, IdPort, pachpanel) VALUES (2, 23, 'POE', 'UP', 1, 1);

SELECT * FROM Coneccio;
# crea una sentenica per seleccionar el nom del dispositu infraestructura i port , el nom i port el del dispositu final el port, el nom de la xarxa el estat tagged, untaged o undefined, el nom de la zona i el pachpanel
    
# selecciona els noms de els dispositus de infraestructrra
SELECT *  FROM Dispositius LEFT JOIN Dispositius_infraestructura ON Dispositius.id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk;

select * from Dispositius where `deviceType` = 'infra';

select * from `Dispositius` LEFT JOIN `PortsInfra` ON Dispositius.id_dispositiu = PortsInfra.id_dispositiuInfra_fk;

select * from Estat;

# inserta a la base de dades un estat
INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, tagged, untagged, _undefined) VALUES (1, 1, 'tagged', 'untagged', '_undefined');

INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, tagged, untagged, _undefined) VALUES (2, 2, 'tagged', 'untagged', '_undefined'); # afeguir un camp connectat a la taula estat


# inserta a la base de dades un dispositu final
INSERT INTO Dispositus_final (id_dispositiu_fk, NumeroPortsFinal) VALUES (3, 1);

INSERT INTO Dispositus_final (id_dispositiu_fk, NumeroPortsFinal) VALUES (4, 2);



# inserta a la base de dades un port de la infraestructura

INSERT INTO PortsInfra (IdPortInfra, EstatPOE, EstatXarxa, id_dispositiuInfra_fk, Id_vlan_fk, numPortInfra, pachpanelInfra) 
VALUES (4, 'FALSE', 'UP', 1, 1, 4, 100); 

INSERT INTO PortsInfra (IdPortInfra, EstatPOE, EstatXarxa, id_dispositiuInfra_fk, Id_vlan_fk, numPortInfra, pachpanelInfra) 
VALUES (3, 'FALSE', 'UP', 1, 1, 4, 101); 

INSERT INTO PortsInfra ( EstatPOE, EstatXarxa, id_dispositiuInfra_fk, numPortInfra, pachpanelInfra)
VALUES ('FALSE', 'UP', 2, 2, 23, 'Pachpanel');


SELECT * FROM `Dispositius_infraestructura` LEFT JOIN `Dispositius` ON Dispositius_infraestructura.id_dispositiu_fk = Dispositius.id_dispositiu 
LEFT JOIN `PortsInfra` ON Dispositius_infraestructura.id_dispositiu_fk = PortsInfra.id_dispositiuInfra_fk WHERE `NomDispositiu` = 'SWITCH-01';


# inserta a la base de dades un port final

INSERT INTO PortsFinal (IdPortFinal, numPortFinal, pachpanelFinal, id_disposituFinal_fk)
VALUES (1, 1, 101, 1);

INSERT INTO `PortsFinal` (`IdPortFinal`, `numPortFinal`, `pachpanelFinal`, `id_disposituFinal_fk`) 
VALUES (2, 1, 102, 2);

INSERT INTO `PortsFinal` ( numPortFinal, id_disposituFinal_fk)
VALUES ( 7, 2);6

SELECT IdPortInfra FROM PortsInfra WHERE id_dispositiuInfra_fk = 6 AND numPortInfra = 1

SELECT  IdPortFinal from PortsFinal where numPortFinal = 7 and id_disposituFinal_fk = 2;

SELECT   IdPortInfra FROM `PortsInfra` WHERE `numPortInfra` = 4 and `id_dispositiuInfra_fk` = 6;

# inserta a la base de dades una connexio
INSERT INTO `Coneccio` (`IdPortFinal_fk`, `IdPortInfra_fk`, `Poe`, `XarxaEstat`, `IdPort`, `pachpanel`)
VALUES (1, 4, 'POE', 'UP', 1, 101);

INSERT INTO `Coneccio` (`IdPortFinal_fk`, `IdPortInfra_fk`, `Poe`, `XarxaEstat`, `IdPort`, `pachpanel`)
VALUES (2, 23, 'POE', 'UP', 2, 200);

SELECT IdPortFinal FROM PortsFinal WHERE id_disposituFinal_fk = 2 AND numPortFinal = 7;

SELECT IdPortFinal FROM PortsFinal WHERE id_disposituFinal_fk = 7 AND numPortFinal = 2;

SELECT IdPortInfra FROM PortsInfra WHERE id_dispositiuInfra_fk = 6 AND numPortInfra = 1;

INSERT INTO `ConexioTrunk` (`IdPortInfraParent_fk`, `IdPortInfraChild_fk`)
VALUES (25, 26);

-- crea una funcio que si el numero de ports 


SELECT * FROM ConexioTrunk;

# inserta a la base de dades un estat

INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, tagged, untagged, _undefined) VALUES (3, 1, 'tagged', 'untagged', '_undefined');

INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, tagged, untagged, _undefined) VALUES (24, 1, 'tagged', 'untagged', '_undefined');

SELECT * FROM Estat;
dispositiu Infraestructura
SELECT * from `Dispositius`;

select ip, NomDispositiu, mac, quantitatPortsEth, deviceType, NomZona, NomXarxa
from Dispositius 
JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
JOIN Xarxa ON Dispositius.Id_vlan = Xarxa.Id_vlan;

SELECT quantitatPortsEth 
            FROM Dispositius_infraestructura 
                JOIN Dispositius 
                ON Dispositius_infraestructura.id_dispositiu_fk = Dispositius.id_dispositiu 
                WHERE NomDispositiu = 'SWITCH-01';

SELECT NomDispositiu AS nomDispositiuInfraestructura FROM Dispositius_infraestructura 
            JOIN Dispositius ON Dispositius_infraestructura.id_dispositiu_fk = Dispositius.id_dispositiu;
SELECT NomDispositiu AS nomDispositiuFinal FROM Dispositus_final 
            JOIN Dispositius ON  Dispositus_final.id_dispositiu_fk = Dispositius.id_dispositiu; 


SELECT * 
            FROM  Dispositius 
                JOIN Dispositius 
                ON Dispositus_final.id_dispositiu_fk = Dispositius.id_dispositiu 
                WHERE NomDispositiu = 'Terminal-01';


-- subconsulta per saber el numero de ports del dispositu tant pot ser Dispositus_final o Dispositius_infraestructura segons el nom donat

SELECT 
       CASE 
           WHEN deviceType LIKE 'infra' 
           THEN (SELECT quantitatPortsEth 
                 FROM   Dispositius_infraestructura 
                 WHERE  Dispositius_infraestructura.id_dispositiu_fk = Dispositius.id_dispositiu) 
           ELSE (SELECT quantitatPortsEth 
                 FROM   Dispositus_final 
                 WHERE  Dispositus_final.id_dispositiu_fk = Dispositius.id_dispositiu)
         END AS quantitatPortsEth
FROM Dispositius WHERE `NomDispositiu` = 'SWITCH-01';



--- create a trigger once insert into `ConexioTrunk` or `Coneccio` before insert a `PortsFinal` and `PortsInfra` row
DELIMITER //
CREATE TRIGGER `insert_ports_ConexioTrunk` AFTER INSERT ON `ConexioTrunk` FOR EACH ROW BEGIN
    INSERT INTO PortsInfra (id_dispositiuInfra_fk, numPortInfra) VALUES (NEW.id_dispositiuInfra_fk, NEW.numPortInfra);
END;



SELECT 
        (SELECT NomDispositiu 
         FROM Dispositius 
         WHERE id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk) AS Dispositiu_Infraestructura,
        PortsInfra.numPortInfra AS Parent Port,
        NomXarxa,
        VlanConfig,
        (SELECT NomDispositiu 
         FROM Dispositius 
         WHERE id_dispositiu = Dispositus_final.id_dispositiu_fk) AS Dispositiu_Final,
        PortsFinal.numPortFinal AS Child Port
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
    
        (SELECT NomDispositiu 
         FROM Dispositius 
         WHERE id_dispositiu = Dispositius_infraestructura.id_dispositiu_fk) AS Dispositiu_Infraestructura,
        
        PortsInfra.numPortInfra AS Parent Port,
        
        NomXarxa,
        VlanConfig,
        
        (SELECT NomDispositiu 
         FROM Dispositius 
         WHERE id_dispositiu = DispositiuInfraChild.id_dispositiu_fk) AS Dispositiu_Final,
        
        PortsInfraChild.numPortInfra AS Port_Dispositiu_Final
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