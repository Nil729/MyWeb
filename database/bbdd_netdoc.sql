-- Active: 1687107432916@@127.0.0.1@3306@bbdd_NetDoc


CREATE DATABASE bbdd_NetDoc;

CREATE TABLE Dispositius (
    id_dispositiu INTEGER PRIMARY KEY AUTO_INCREMENT,
    IP VARCHAR(15) UNIQUE,
    NomDispositiu TEXT,
    MAC TEXT,
    zona_id INTEGER,
    Id_vlan INTEGER,
    QuantitatPortsEth INTEGER,
    descripcio_dispositiu TEXT,
    FOREIGN KEY(zona_id) REFERENCES Zona(Id_zona),
    FOREIGN KEY(Id_vlan) REFERENCES Xarxa(Id_vlan)
);

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

CREATE TABLE Xarxa (
    Id_vlan INTEGER PRIMARY KEY AUTO_INCREMENT,
    NomXarxa TEXT,
    DescXarxa TEXT
);

DROP TABLE Xarxa;


CREATE TABLE Coneccio (
    IdPortFinal_fk INTEGER,
    IdPortInfra_fk INTEGER,
    Poe TEXT,
    XarxaEstat TEXT,
    IdPort INTEGER,

    FOREIGN KEY(IdPortFinal_fk) REFERENCES PortsFinal(IdPortFinal),
    FOREIGN KEY(IdPortInfra_fk) REFERENCES PortsInfra(IdPortInfra)
);

#recursivitat connexió per poder connectar entre ports de infraestructura

CREATE TABLE ConexioTrunk (
    IdConexioTrunk INTEGER PRIMARY KEY AUTO_INCREMENT,
    IdPortInfraParent_fk INTEGER,
    IdPortInfraChild_fk INTEGER,
    FOREIGN KEY(IdPortInfraParent_fk) REFERENCES PortsInfra(IdPortInfra),
    FOREIGN KEY(IdPortInfraChild_fk) REFERENCES PortsInfra(IdPortInfra)
);



DROP TABLE Coneccio;

CREATE TABLE Estat (
    IdPortInfra_fk INTEGER,
    Id_vlan_fk INTEGER,
    tagged TEXT,
    untagged TEXT,
    _undefined TEXT,
    FOREIGN KEY(IdPortInfra_fk) REFERENCES PortsInfra(IdPortInfra),
    FOREIGN KEY(Id_vlan_fk) REFERENCES Xarxa(Id_vlan)
);

DROP TABLE Estat;


# inserta a la base de dades un dispositu

INSERT INTO Dispositius (id_dispositiu, IP, NomDispositiu, MAC, zona_id, Id_vlan, QuantitatPortsEth, descripcio_dispositiu) 
VALUES (1, '192.168.1.1', 'RUTER', '00:00:00:00:00:00', 1, 1, 4, 'MAIN RUTER');

INSERT INTO Dispositius (id_dispositiu, IP, NomDispositiu, MAC, zona_id, Id_vlan, QuantitatPortsEth, descripcio_dispositiu)
VALUES (2, '192.168.10.100', 'SWITCH', '00:00:00:00:00:00', 1, 2, 24, 'MAIN SWITCH');

INSERT INTO Dispositius (id_dispositiu, IP, NomDispositiu, MAC, zona_id, Id_vlan, QuantitatPortsEth, descripcio_dispositiu)
VALUES (3, '192.168.10.102', 'PC1', '00:00:00:00:00:00', 2, 3, 1, 'PC OFICINES');

INSERT INTO Dispositius (id_dispositiu, IP, NomDispositiu, MAC, zona_id, Id_vlan, QuantitatPortsEth, descripcio_dispositiu)
VALUES (4, '192.168.10.103', 'PC2', '00:00:00:00:00:00', 3, 4, 1, 'PC PORDUCCIÓ');


SELECT * FROM Dispositius;
# inserta a la base de dades una zona

INSERT INTO Zona (Id_zona,NomZona, DescZona) VALUES (1, 'INFRA', 'INFRAESTRUCTURA');

INSERT INTO Zona (Id_zona, NomZona, DescZona) VALUES (2, 'OFICINES', 'OFICINES');

INSERT INTO Zona (Id_zona, NomZona, DescZona) VALUES (3, 'PORDUCCIÓ', 'PRODUCCIÓ');

SELECT * FROM Zona;

# inserta a la base de dades una xarxa 

INSERT INTO Xarxa (Id_vlan, NomXarxa, DescXarxa) VALUES (1, 'V_infra', 'V_infra');
INSERT INTO Xarxa (Id_vlan, NomXarxa, DescXarxa) VALUES (2, 'V_officines', 'V_officines');
INSERT INTO Xarxa (Id_vlan, NomXarxa, DescXarxa) VALUES (3, 'V_producció', 'V_producció');



# inserta a la base de dades dispositus de la infraestructura

INSERT INTO Dispositus_infraestructura (id_dispositiu_fk) VALUES (1);

INSERT INTO Dispositus_infraestructura (id_dispositiu_fk) VALUES (2);

# inserta a la base de dades un dispositu final
INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (3);

INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (4);


# inserta a la base de dades un port final

INSERT INTO PortsFinal (`IdPortFinal`, numPort id_disposituFinal_fk) VALUES (1, 3);

INSERT INTO PortsFinal (IdPortFinal, numPort id_disposituFinal_fk) VALUES (1, 4);

SELECT * FROM PortsFinal;

# inserta a la base de dades una connexio dispositu infra (PC-1) a dispositu final (RUTER)
INSERT INTO Coneccio (IdPortFinal_fk, IdPortInfra_fk, Poe, XarxaEstat, IdPort, pachpanel) VALUES (1, 4, 'POE', 'UP', 1, 1);

# inserta a la base de dades una connexio dispositu infra (PC-2) a dispositu final (SWITCH)
INSERT INTO Coneccio (IdPortFinal_fk, IdPortInfra_fk, Poe, XarxaEstat, IdPort, pachpanel) VALUES (2, 23, 'POE', 'UP', 1, 1);

SELECT * FROM Coneccio;

SELECT * FROM 

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