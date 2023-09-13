-- Active: 1687107432916@@127.0.0.1@3306@bbdd_NetDoc
-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: bbdd_NetDoc
-- ------------------------------------------------------

--
-- Table structure for table `Coneccio`
--

CREATE TABLE users (
  idUser INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nameUser VARCHAR(255) NOT NULL,
  emailUser VARCHAR(255) NOT NULL UNIQUE,
  imagePorfileUser VARCHAR(255) NOT NULL,
  provider_Auth VARCHAR(255) NOT NULL,
  provider_id VARCHAR(255) NOT NULL
);
DROP TABLE IF EXISTS `Coneccio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Coneccio` (
  `IdPortFinal_fk` int DEFAULT NULL,
  `IdPortInfra_fk` int DEFAULT NULL,
  `Poe` text,
  `XarxaEstat` text,
  `IdPort` int DEFAULT NULL,
  `pachpanel` int DEFAULT NULL,
  `idConneccio` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idConneccio`),
  UNIQUE KEY `IdPortFinal_fk` (`IdPortFinal_fk`,`IdPortInfra_fk`),
  UNIQUE KEY `IdPortFinal_fk_2` (`IdPortFinal_fk`,`IdPortInfra_fk`),
  KEY `IdPortInfra_fk` (`IdPortInfra_fk`),
  CONSTRAINT `Coneccio_ibfk_3` FOREIGN KEY (`IdPortInfra_fk`) REFERENCES `PortsInfra` (`IdPortInfra`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Coneccio_ibfk_4` FOREIGN KEY (`IdPortFinal_fk`) REFERENCES `PortsFinal` (`IdPortFinal`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Coneccio_ibfk_5` FOREIGN KEY (`IdPortInfra_fk`) REFERENCES `PortsInfra` (`IdPortInfra`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;




--
-- Table structure for table `ConexioTrunk`
--

DROP TABLE IF EXISTS `ConexioTrunk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ConexioTrunk` (
  `IdConexioTrunk` int NOT NULL AUTO_INCREMENT,
  `IdPortInfraParent_fk` int DEFAULT NULL,
  `IdPortInfraChild_fk` int DEFAULT NULL,
  PRIMARY KEY (`IdConexioTrunk`),
  UNIQUE KEY `IdPortInfraParent_fk` (`IdPortInfraParent_fk`,`IdPortInfraChild_fk`),
  UNIQUE KEY `IdPortInfraParent_fk_2` (`IdPortInfraParent_fk`,`IdPortInfraChild_fk`),
  KEY `IdPortInfraChild_fk` (`IdPortInfraChild_fk`),
  CONSTRAINT `ConexioTrunk_ibfk_2` FOREIGN KEY (`IdPortInfraParent_fk`) REFERENCES `PortsInfra` (`IdPortInfra`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ConexioTrunk_ibfk_3` FOREIGN KEY (`IdPortInfraChild_fk`) REFERENCES `PortsInfra` (`IdPortInfra`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Dispositius`
--

DROP TABLE IF EXISTS `Dispositius`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dispositius` (
   `IdUsuario_fk` int DEFAULT NULL,
  `id_dispositiu` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(15) DEFAULT NULL,
  `NomDispositiu` varchar(25) DEFAULT NULL,
  `mac` text,
  `zona_id` int DEFAULT NULL,
  `Id_vlan` int DEFAULT NULL,
  `quantitatPortsEth` text,
  `descripcio_dispositiu` text,
  `deviceType` text,
  PRIMARY KEY (`id_dispositiu`),
  UNIQUE KEY `IP` (`ip`),
  UNIQUE KEY `ip_2` (`ip`),
  UNIQUE KEY `NomDispositiu` (`NomDispositiu`),
  KEY `zona_id` (`zona_id`),
  KEY `Id_vlan` (`Id_vlan`),
  CONSTRAINT `Dispositius_ibfk_3` FOREIGN KEY (`Id_vlan`) REFERENCES `Xarxa` (`Id_vlan`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Dispositius_ibfk_4` FOREIGN KEY (`zona_id`) REFERENCES `Zona` (`Id_zona`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Dispositius_ibfk_5` FOREIGN KEY (`Id_vlan`) REFERENCES `Xarxa` (`Id_vlan`) ON DELETE CASCADE ON UPDATE CASCADE
  CONSTRAINT `Dispositius_ibfk_6` FOREIGN KEY (`idUser_fk`) REFERENCES `users` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- create a trigger or fuction when the zona_id of the device has been deleted it establishes a default zone


DELIMITER ;;
CREATE TRIGGER `SetDefaultZonaBeforeInsert` BEFORE INSERT ON `Dispositius`
FOR EACH ROW BEGIN
    -- Check if zona_id is NULL
    IF NEW.zona_id IS NULL THEN
        -- Get the idUser_fk for the current row
        SET @idUser = (SELECT IdUsuario_fk FROM Dispositius WHERE id_dispositiu = NEW.id_dispositiu);
        
        -- Get the id of the default zone for the same user
        SET @idDefaultZone = (SELECT OLD.Id_zona FROM Zona WHERE NomZona = 'Undefined location' AND idUser_fk = @idUser);
        
        -- Show in console idUser and idDefaultZone
        SELECT @idUser, @idDefaultZone;
        raise notice 'SetDefaultZonaBeforeInsert: idUser: %, idDefaultZone: %', @idUser, @idDefaultZone;
        
        -- Set the zona_id to the default zone id
        SET NEW.zona_id = @idDefaultZone;
    END IF;
END;
;;


DELIMITER ;;
CREATE TRIGGER `SetDefaultZonaAfterDelete` AFTER DELETE ON `Zona`
FOR EACH ROW BEGIN
    -- Get the idUser_fk for the current row
    SET @idUser = (SELECT idUser_fk FROM `Zona` JOIN Dispositius ON Zona.Id_zona = Dispositius.zona_id WHERE id_dispositiu = id_dispositiu LIMIT 1);
    
    -- Get the id of the default zone for the same user
    SET @idDefaultZone = (SELECT Id_zona FROM Zona WHERE NomZona = 'Undefined location' AND idUser_fk = 3 LIMIT 1);

    -- Update the zona_id in Dispositius to the default zone id
    UPDATE Dispositius SET zona_id = @idDefaultZone WHERE zona_id is null;
END;
;;
DELIMITER ;


UPDATE Dispositius SET zona_id = @idDefaultZone WHERE zona_id is null;


UPDATE Dispositius SET zona_id = 31 WHERE zona_id = null;

select *  from Dispositius where zona_id is null;

SELECT  idUser_fk FROM `Zona` JOIN Dispositius ON Zona.Id_zona = Dispositius.zona_id WHERE id_dispositiu = 77;

ALTER TABLE `Dispositius` DROP FOREIGN KEY `Dispositius_ibfk_4`;
ALTER TABLE `Dispositius` ADD CONSTRAINT `Dispositius_ibfk_4` FOREIGN KEY (`zona_id`) REFERENCES `Zona` (`Id_zona`) ON DELETE SET NULL ON UPDATE CASCADE;

-- modica la talula perque NomDispositiu, ip i mac siguin no siguin uniques

ALTER TABLE `Dispositius` CHANGE `IdUsuario_fk` `idUser_fk` int DEFAULT NULL;
ALTER TABLE `Dispositius` ADD CONSTRAINT `Dispositius_ibfk_6` FOREIGN KEY (`idUser_fk`) REFERENCES `users` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;



-- Modifica la taula Dispositius per eliminar la CONSTRAINT `Dispositius_ibfk_6` FOREIGN KEY (`idUser_fk`) REFERENCES `users` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;
-- elimina la columna idUser_fk

ALTER TABLE `Dispositius` DROP FOREIGN KEY `Dispositius_ibfk_6`;
ALTER TABLE `Dispositius` DROP COLUMN `idUser_fk`;




DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_dispositiuType` AFTER INSERT ON `Dispositius` FOR EACH ROW BEGIN
    IF NEW.deviceType = 'infra' THEN
        INSERT INTO Dispositius_infraestructura (id_dispositiu_fk) VALUES (NEW.id_dispositiu);
    ELSEIF NEW.deviceType = 'final' THEN
        INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (NEW.id_dispositiu);
    END IF;
END */;;
DELIMITER ;

 
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_dispositiuType` AFTER UPDATE ON `Dispositius` FOR EACH ROW BEGIN
    IF NEW.deviceType <> OLD.deviceType THEN
        IF NEW.deviceType = 'infra' THEN
            INSERT INTO Dispositius_infraestructura (id_dispositiu_fk) VALUES (NEW.id_dispositiu);
            DELETE FROM Dispositus_final WHERE id_dispositiu_fk = NEW.id_dispositiu;
        ELSEIF NEW.deviceType = 'final' THEN
            INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (NEW.id_dispositiu);
            DELETE FROM Dispositius_infraestructura WHERE id_dispositiu_fk = NEW.id_dispositiu;
        END IF;
    END IF;
END */;;
DELIMITER ;

--
-- Table structure for table `Dispositius_infraestructura`
--

DROP TABLE IF EXISTS `Dispositius_infraestructura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dispositius_infraestructura` (
  `id_dispositiuInfra` int NOT NULL AUTO_INCREMENT,
  `id_dispositiu_fk` int DEFAULT NULL,
  PRIMARY KEY (`id_dispositiuInfra`),
  KEY `id_dispositiu_fk` (`id_dispositiu_fk`),
  CONSTRAINT `Dispositius_infraestructura_ibfk_1` FOREIGN KEY (`id_dispositiu_fk`) REFERENCES `Dispositius` (`id_dispositiu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Dispositus_final`
--

DROP TABLE IF EXISTS `Dispositus_final`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dispositus_final` (
  `id_disposituFinal` int NOT NULL AUTO_INCREMENT,
  `id_dispositiu_fk` int DEFAULT NULL,
  PRIMARY KEY (`id_disposituFinal`),
  KEY `id_dispositiu_fk` (`id_dispositiu_fk`),
  CONSTRAINT `Dispositus_final_ibfk_1` FOREIGN KEY (`id_dispositiu_fk`) REFERENCES `Dispositius` (`id_dispositiu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Estat`
--

DROP TABLE IF EXISTS `Estat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Estat` (
  `Id_vlan_fk` int DEFAULT NULL,
  `VlanConfig` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Connectat` tinyint(1) DEFAULT NULL,
  `IdEstat` int NOT NULL AUTO_INCREMENT,
  `IdPortInfra_fk` int NOT NULL,
  PRIMARY KEY (`IdEstat`),
  KEY `Id_vlan_fk` (`Id_vlan_fk`),
  KEY `Estat_ibfk_2_new` (`IdPortInfra_fk`),
  CONSTRAINT `Estat_ibfk_2_new` FOREIGN KEY (`IdPortInfra_fk`) REFERENCES `PortsInfra` (`IdPortInfra`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Estat_ibfk_3` FOREIGN KEY (`Id_vlan_fk`) REFERENCES `Xarxa` (`Id_vlan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PortsFinal`
--

DROP TABLE IF EXISTS `PortsFinal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PortsFinal` (
  `IdPortFinal` int NOT NULL AUTO_INCREMENT,
  `numPortFinal` int DEFAULT NULL,
  `pachpanelFinal` int DEFAULT NULL,
  `id_disposituFinal_fk` int DEFAULT NULL,
  PRIMARY KEY (`IdPortFinal`),
  KEY `id_disposituFinal_fk` (`id_disposituFinal_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PortsInfra`
--

DROP TABLE IF EXISTS `PortsInfra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PortsInfra` (
  `IdPortInfra` int NOT NULL AUTO_INCREMENT,
  `EstatPOE` text,
  `EstatXarxa` text,
  `id_dispositiuInfra_fk` int DEFAULT NULL,
  `numPortInfra` int DEFAULT NULL,
  `pachpanelInfra` int DEFAULT NULL,
  PRIMARY KEY (`IdPortInfra`),
  UNIQUE KEY `IdPortInfra_UNIQUE` (`IdPortInfra`),
  KEY `id_dispositiuInfra_fk` (`id_dispositiuInfra_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Xarxa`
--

DROP TABLE IF EXISTS `Xarxa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Xarxa` (
  `Id_vlan` int NOT NULL AUTO_INCREMENT,
  `NomXarxa` varchar(25) DEFAULT NULL,
  `DescXarxa` text,
  PRIMARY KEY (`Id_vlan`),
  UNIQUE KEY `NomXarxa` (`NomXarxa`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- modifica la taula xarxa perque es relacioni amb la la taula users a traves del idUser_fk
ALTER TABLE `Xarxa` ADD `idUser_fk` INT NULL AFTER `DescXarxa`;
-- modifica la taula xarxa perque es relacioni amb la la taula users a traves del idUser_fk
ALTER TABLE `Xarxa` ADD CONSTRAINT `Xarxa_ibfk_1` FOREIGN KEY (`idUser_fk`) REFERENCES `users` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `Xarxa` DROP INDEX NomXarxa;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Zona`
--

DROP TABLE IF EXISTS `Zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Zona` (
  `Id_zona` int NOT NULL AUTO_INCREMENT,
  `NomZona` varchar(25) DEFAULT NULL,
  `DescZona` text,
  PRIMARY KEY (`Id_zona`),
  UNIQUE KEY `NomZona` (`NomZona`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- mofica la tabla Zona perque estigui relacionada amb users afaguint una nova columna idUser_fk
ALTER TABLE `Zona` ADD `idUser_fk` INT NULL AFTER `DescZona`;

ALTER TABLE Zona DROP INDEX NomZona;


-- create a trigger when insert or update in to tables: `Dispositius`, `Zona`, `Xarxa` `Coneccio`
-- don't allow repet NameZona, NameXarxa, NameDispositiu, ip and mac for each one idUser 

DELIMITER ;;

CREATE TRIGGER `insert_zona` BEFORE INSERT ON `Zona` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM Zona WHERE NomZona = NEW.NomZona AND idUser_fk = NEW.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir la zona perque ja existeix una zona amb el mateix nom';
    END IF;
END;;

CREATE TRIGGER `update_zona` BEFORE UPDATE ON `Zona` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM Zona WHERE NomZona = NEW.NomZona AND idUser_fk = NEW.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar la zona perque ja existeix una zona amb el mateix nom';
    END IF;
END;;

CREATE TRIGGER `insert_xarxa` BEFORE INSERT ON `Xarxa` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM Xarxa WHERE NomXarxa = NEW.NomXarxa AND idUser_fk = NEW.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir la xarxa perque ja existeix una xarxa amb el mateix nom';
    END IF;
END;;

CREATE TRIGGER `update_xarxa` BEFORE UPDATE ON `Xarxa` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM Xarxa WHERE NomXarxa = NEW.NomXarxa AND idUser_fk = NEW.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar la xarxa perque ja existeix una xarxa amb el mateix nom';
    END IF;
END;;

CREATE TRIGGER `insert_dispositiu` BEFORE INSERT ON `Dispositius` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM Dispositius 
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        WHERE NomDispositiu = NEW.NomDispositiu AND Zona.idUser_fk = NEW.Zona.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir el dispositiu perque ja existeix un dispositiu amb el mateix nom';
    END IF;
    IF (SELECT COUNT(*) FROM Dispositius 
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        WHERE ip = NEW.ip AND Zona.idUser_fk = NEW.Zona.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir el dispositiu perque ja existeix un dispositiu amb la mateixa ip';
    END IF;
    IF (SELECT COUNT(*) FROM Dispositius 
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        WHERE mac = NEW.mac AND Zona.idUser_fk = NEW.Zona.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir el dispositiu perque ja existeix un dispositiu amb la mateixa mac';
    END IF;
END;;

CREATE TRIGGER `update_dispositiu` BEFORE UPDATE ON `Dispositius` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM Dispositius 
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        WHERE NomDispositiu = NEW.NomDispositiu AND Zona.idUser_fk = NEW.Zona.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar el dispositiu perque ja existeix un dispositiu amb el mateix nom';
    END IF;
    IF (SELECT COUNT(*) FROM Dispositius 
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        WHERE ip = NEW.ip AND Zona.idUser_fk = NEW.Zona.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar el dispositiu perque ja existeix un dispositiu amb la mateixa ip';
    END IF;
    IF (SELECT COUNT(*) FROM Dispositius
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        WHERE mac = NEW.mac AND Zona.idUser_fk = NEW.Zona.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar el dispositiu perque ja existeix un dispositiu amb la mateixa mac';
    END IF;
END;;

DELIMITER ;



SELECT NomDispositiu FROM Dispositius 
JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
WHERE NomDispositiu = NomDispositiu AND idUser_fk = 1;

-- get the equal name of dispositiu
SELECT COUNT(*) FROM Coneccio WHERE IdPortFinal_fk = NEW.IdPortFinal_fk AND IdPortInfra_fk = NEW.IdPortInfra_fk


SELECT COUNT(*), NomZona FROM Zona WHERE NomZona = 'test nil' AND idUser_fk = 1



INSERT INTO Dispositius (  NomDispositiu, deviceType, ip, mac, zona_id, Id_vlan, quantitatPortsEth, descripcio_dispositiu) VALUES 
      ('Infra_NilSession', 'Infra', '192.168.1.1', '16:22:33:30:15:63', 18, 1, 10, "test")


SELECT COUNT(*) FROM Dispositius 
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        WHERE NomDispositiu = NEW.NomDispositiu AND Zona.idUser_fk = NEW.Zona.idUser_fk

