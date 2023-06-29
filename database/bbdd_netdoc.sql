-- Active: 1687107432916@@127.0.0.1@3306@db_web

-- SQLBook: Code
-- Active: 1684133436936@@127.0.0.1@5432

CREATE TABLE Dispositius (
    IP TEXT,
    NomDispositiu TEXT,
    id_dispositiu INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_entradaPort INTEGER,
    MAC TEXT,
    zona_id INTEGER,
    Id_vlan INTEGER,
    FOREIGN KEY(zona_id) REFERENCES Zona(Id_zona),
    FOREIGN KEY(Id_vlan) REFERENCES Xarxa(Id_vlan),
    FOREIGN KEY(id_dispositiu) REFERENCES Dispositus_infraestructura(id_dispositiu)
);

CREATE TABLE Zona (
    Id_zona INTEGER PRIMARY KEY,
    NomZona TEXT
);

CREATE TABLE Xarxa (
    Id_vlan INTEGER PRIMARY KEY,
    nom TEXT
);

CREATE TABLE Dispositus_infraestructura (
    id_dispositiu INTEGER PRIMARY KEY,
    NumeroPorts INTEGER 
);

CREATE TABLE Ports (
    IdPort INTEGER PRIMARY KEY,
    EstatPOE TEXT,
    EstatXarxa TEXT,
    id_dispositiu_fk INTEGER,
    FOREIGN KEY(id_dispositiu_fk) REFERENCES Dispositus_infraestructura(id_dispositiu)
);

CREATE TABLE Coneccio (
    id_dispositiu INTEGER,
    id_dispositiuFinals INTEGER,
    Poe TEXT,
    XarxaEstat TEXT,
    IdPort INTEGER,
    Id_vlan INTEGER,
    xPort INTEGER,
    FOREIGN KEY(id_dispositiuFinals) REFERENCES Dispositius(id_dispositiu),
    FOREIGN KEY(id_dispositiu) REFERENCES Dispositus_infraestructura(id_dispositiu),
    FOREIGN KEY(Id_vlan) REFERENCES Xarxa(Id_vlan)
);

CREATE TABLE Estat (
    IdPort_fk INTEGER,
    Id_vlan_fk INTEGER,
    tagged TEXT,
    untagged TEXT,
    _undefined TEXT,
    FOREIGN KEY(IdPort_fk) REFERENCES Ports(IdPort),
    FOREIGN KEY(Id_vlan_fk) REFERENCES Xarxa(Id_vlan)
);


--ALTER TABLE Dispositius ADD FOREIGN KEY (id_dispositiu) REFERENCES Dispositus_infraestructura(id_dispositiu);

# inserta a la base de dades un dispositu
--INSERT INTO Dispositius (IP, NomDispositiu, id_entradaPort, MAC, zona_id, Id_vlan)
--VALUES ('192.168.1.100', 'Router', 2, '00:11:22:33:44:55', 1, 1);

# inserta a la base de dades un dispositiu_infraestructura
--INSERT INTO Dispositus_infraestructura (id_dispositiu, NumeroPorts) VALUES (1, 48);


--select * FROM "Dispositius";
--SELECT * FROM "Dispositius" LEFT JOIN "Dispositus_infraestructura" ON "Dispositius"."id_dispositiu" = "Dispositus_infraestructura"."id_dispositiu";


-- DROP TABLE "Dispositius";




-- DROP TABLE "Dispositus_infraestructura";

--DROP TABLE "Coneccio";


-- DROP TABLE "Estat";

-- insert de dispositius

-- INSERT INTO Dispositius (IP, NomDispositiu, id_entradaPort, MAC, zona_id, Id_vlan) VALUES ("1.1.1.1", "Router", 1, "00:11:22:33:44:55", 1, 1);

-- select * from Dispositius LEFT JOIN Dispositus_infraestructura ON Dispositius.id_dispositiu = Dispositus_infraestructura.id_dispositiu;


-- select * from Dispositius LEFT JOIN Dispositus_infraestructura ON Dispositius.id_dispositiu = Dispositus_infraestructura.id_dispositiu where "NumeroPorts" > 1;

-- insert de dispositius_infraestructura

-- INSERT INTO Dispositus_infraestructura (id_dispositiu, NumeroPorts) VALUES (1, 48);



-- insert de zones
INSERT INTO Zona (Id_zona, NomZona) VALUES (1, 'Aula smx');
INSERT INTO Zona (Id_zona, NomZona) VALUES (2, 'Aula asix');
INSERT INTO Zona (Id_zona, NomZona) VALUES (3, 'Aula daw');
INSERT INTO Zona (Id_zona, NomZona) VALUES (4, 'Aula Professors');
SELECT * from  zona;


-- insert de xarxes

INSERT INTO Xarxa (Id_vlan, nom) VALUES (1, 'vlan1');
INSERT INTO Xarxa (Id_vlan, nom) VALUES (2, 'vlan2');
INSERT INTO Xarxa (Id_vlan, nom) VALUES (3, 'vlan3');
INSERT INTO Xarxa (Id_vlan, nom) VALUES (4, 'vlan4');
INSERT INTO Xarxa (Id_vlan, nom) VALUES (?, 'vlanTest');

SELECT * from  Xarxa;
