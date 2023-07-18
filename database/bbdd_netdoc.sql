-- Active: 1687107432916@@127.0.0.1@3306@bbdd_NetDoc


CREATE DATABASE bbdd_NetDoc;

CREATE TABLE Dispositius (
    id_dispositiu INTEGER PRIMARY KEY AUTO_INCREMENT,
    ip VARCHAR(15) UNIQUE,
    NomDispositiu TEXT,
    mac TEXT,
    zona_id INTEGER,
    Id_vlan INTEGER,
    quantitatPortsEth INTEGER,
    descripcio_dispositiu TEXT,
    deviceType BOOLEAN,
    FOREIGN KEY(zona_id) REFERENCES Zona(Id_zona),
    FOREIGN KEY(Id_vlan) REFERENCES Xarxa(Id_vlan)
);
-- cavia els noms de les columents IP i MAC perque siguin minusculas
ALTER TABLE Dispositius CHANGE IP ip VARCHAR(15) UNIQUE;
ALTER TABLE Dispositius CHANGE QuantitatPortsEth quantitatPortsEth TEXT;
ALTER TABLE Dispositius ADD deviceType BOOLEAN;

-- Canvia perque el tipus de dispositu sigui TEXT
ALTER TABLE Dispositius MODIFY COLUMN deviceType TEXT;

SELECT * FROM Dispositius;

DROP TABLE Dispositius;

CREATE TABLE PortsFinal (
    IdPortFinal INTEGER PRIMARY KEY AUTO_INCREMENT,
    numPortFinal INTEGER,
    pachpanelFinal INTEGER,
    id_disposituFinal_fk INTEGER,
    FOREIGN KEY(id_disposituFinal_fk) REFERENCES Dispositus_final(id_disposituFinal)
);

DROP TABLE PortsFinal;

CREATE TABLE PortsInfra (
    IdPortInfra INTEGER PRIMARY KEY AUTO_INCREMENT,
    EstatPOE TEXT,
    EstatXarxa TEXT,
    id_dispositiuInfra_fk INTEGER,
    Id_vlan_fk INTEGER,
    numPortInfra INTEGER,
    pachpanelInfra TEXT,
    FOREIGN KEY(id_dispositiuInfra_fk) REFERENCES Dispositus_infraestructura(id_dispositiuInfra),
    FOREIGN KEY(Id_vlan_fk) REFERENCES Xarxa(Id_vlan)

);
DROP TABLE PortsInfra;

CREATE TABLE Dispositus_infraestructura (
    id_dispositiuInfra INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_dispositiu_fk INTEGER
);

DROP TABLE Dispositus_infraestructura;

CREATE TABLE Dispositus_final (
    id_disposituFinal INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_dispositiu_fk INTEGER
);

DROP TABLE Dispositus_final;

CREATE TABLE Zona (
    Id_zona INTEGER PRIMARY KEY AUTO_INCREMENT,
    NomZona TEXT,
    DescZona TEXT
);
DROP TABLE Zona;

ubicacioName, 

CREATE TABLE Xarxa (
    Id_vlan INTEGER PRIMARY KEY AUTO_INCREMENT,
    NomXarxa TEXT,
    DescXarxa TEXT
);

DROP TABLE Xarxa;

CREATE TABLE Coneccio (
    IdPortFinal_fk INTEGER UNIQUE,
    IdPortInfra_fk INTEGER UNIQUE,
    Poe TEXT,
    XarxaEstat TEXT,
    IdPort INTEGER,

    FOREIGN KEY(IdPortFinal_fk) REFERENCES PortsFinal(IdPortFinal),
    FOREIGN KEY(IdPortInfra_fk) REFERENCES PortsInfra(IdPortInfra)
);

#modifica la taula perque el IdPortFinal_fk i el IdPortInfra_fk perque siguin unique i eliminar el camp xPort

Alter TABLE Coneccio DROP COLUMN xPort;

ALTER TABLE Coneccio ADD UNIQUE (IdPortFinal_fk, IdPortInfra_fk);

#recursivitat connexió per poder connectar entre ports de infraestructura

CREATE TABLE ConexioTrunk (
    IdConexioTrunk INTEGER PRIMARY KEY AUTO_INCREMENT,
    IdPortInfraParent_fk INTEGER UNIQUE,
    IdPortInfraChild_fk INTEGER UNIQUE,
    FOREIGN KEY(IdPortInfraParent_fk) REFERENCES PortsInfra(IdPortInfra),
    FOREIGN KEY(IdPortInfraChild_fk) REFERENCES PortsInfra(IdPortInfra)
);
ALTER TABLE ConexioTrunk ADD UNIQUE (IdPortInfraParent_fk, IdPortInfraChild_fk);

DROP TABLE Coneccio;

CREATE TABLE Estat (
    IdPortInfra_fk INTEGER UNIQUE,
    Id_vlan_fk INTEGER,
    tagged TEXT,
    untagged TEXT,
    _undefined TEXT,
    FOREIGN KEY(IdPortInfra_fk) REFERENCES PortsInfra(IdPortInfra),
    FOREIGN KEY(Id_vlan_fk) REFERENCES Xarxa(Id_vlan)
);
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

SELECT * FROM Dispositius;

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
SELECT * from Dispositus_infraestructura;
INSERT INTO Dispositus_infraestructura (id_dispositiu_fk) VALUES (1);

INSERT INTO Dispositus_infraestructura (id_dispositiu_fk) VALUES (2);

# inserta a la base de dades un dispositu final
INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (3);

INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (4);


# inserta a la base de dades un port final

INSERT INTO PortsFinal (`IdPortFinal`, numPort id_disposituFinal_fk) VALUES (1, 3);

INSERT INTO PortsFinal (IdPortFinal, numPort id_disposituFinal_fk) VALUES (3, 4);

SELECT * FROM PortsFinal;

# inserta a la base de dades una connexio dispositu infra (PC-1) a dispositu final (RUTER)
INSERT INTO Coneccio (IdPortFinal_fk, IdPortInfra_fk, Poe, XarxaEstat, IdPort, pachpanel) VALUES (1, 4, 'POE', 'UP', 1, 1);

# inserta a la base de dades una connexio dispositu infra (PC-2) a dispositu final (SWITCH)
INSERT INTO Coneccio (IdPortFinal_fk, IdPortInfra_fk, Poe, XarxaEstat, IdPort, pachpanel) VALUES (2, 23, 'POE', 'UP', 1, 1);

SELECT * FROM Coneccio;


select * from Estat;

# inserta a la base de dades un estat
INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, tagged, untagged, _undefined) VALUES (1, 1, 'tagged', 'untagged', '_undefined');

INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, tagged, untagged, _undefined) VALUES (2, 2, 'tagged', 'untagged', '_undefined');


# inserta a la base de dades un dispositu final
INSERT INTO Dispositus_final (id_dispositiu_fk, NumeroPortsFinal) VALUES (3, 1);

INSERT INTO Dispositus_final (id_dispositiu_fk, NumeroPortsFinal) VALUES (4, 2);



# inserta a la base de dades un port de la infraestructura

INSERT INTO PortsInfra (IdPortInfra, EstatPOE, EstatXarxa, id_dispositiuInfra_fk, Id_vlan_fk, numPortInfra, pachpanelInfra) 
VALUES (4, 'FALSE', 'UP', 1, 1, 4, 100); 

INSERT INTO PortsInfra (IdPortInfra, EstatPOE, EstatXarxa, id_dispositiuInfra_fk, Id_vlan_fk, numPortInfra, pachpanelInfra) 
VALUES (3, 'FALSE', 'UP', 1, 1, 4, 101); 

INSERT INTO PortsInfra (IdPortInfra, EstatPOE, EstatXarxa, id_dispositiuInfra_fk, Id_vlan_fk, numPortInfra, pachpanelInfra) 
VALUES (23, 'TRUE', 'DOWN', 2, 2, 23, 200);
INSERT INTO PortsInfra (IdPortInfra, EstatPOE, EstatXarxa, id_dispositiuInfra_fk, Id_vlan_fk, numPortInfra, pachpanelInfra) 
VALUES (24, 'TRUE', 'DOWN', 2, 2, 24, 201);  

SELECT * FROM `Dispositus_infraestructura` JOIN `Dispositius` ON Dispositus_infraestructura.id_dispositiu_fk = Dispositius.id_dispositiu  WHERE `id_dispositiuInfra` = 1;

SELECT * from `PortsInfra`;

# inserta a la base de dades un port final

INSERT INTO PortsFinal (IdPortFinal, numPortFinal, pachpanelFinal, id_disposituFinal_fk)
VALUES (1, 1, 101, 1);

INSERT INTO `PortsFinal` (`IdPortFinal`, `numPortFinal`, `pachpanelFinal`, `id_disposituFinal_fk`) 
VALUES (2, 1, 102, 2);

SELECT * FROM `PortsInfra`;

SELECT * FROM PortsFinal;

# inserta a la base de dades una connexio
INSERT INTO `Coneccio` (`IdPortFinal_fk`, `IdPortInfra_fk`, `Poe`, `XarxaEstat`, `IdPort`, `pachpanel`)
VALUES (1, 4, 'POE', 'UP', 1, 101);

INSERT INTO `Coneccio` (`IdPortFinal_fk`, `IdPortInfra_fk`, `Poe`, `XarxaEstat`, `IdPort`, `pachpanel`)
VALUES (2, 23, 'POE', 'UP', 2, 200);

SELECT * FROM Coneccio;

INSERT INTO `ConexioTrunk` (`IdPortInfraParent_fk`, `IdPortInfraChild_fk`)
VALUES (3, 24);

SELECT * FROM ConexioTrunk;

# inserta a la base de dades un estat

INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, tagged, untagged, _undefined) VALUES (3, 1, 'tagged', 'untagged', '_undefined');

INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, tagged, untagged, _undefined) VALUES (24, 1, 'tagged', 'untagged', '_undefined');

SELECT * FROM Estat;

SELECT * from `Dispositius`;

select ip, NomDispositiu, mac, quantitatPortsEth, deviceType, NomZona, NomXarxa
from Dispositius 
JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
JOIN Xarxa ON Dispositius.Id_vlan = Xarxa.Id_vlan;


select * from `Xarxa`;