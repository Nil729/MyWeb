-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: bbdd_NetDoc
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Coneccio`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Dispositius`
--

DROP TABLE IF EXISTS `Dispositius`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dispositius` (
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
  KEY `Id_vlan` (`Id_vlan`),
  KEY `Dispositius_ibfk_4` (`zona_id`),
  CONSTRAINT `Dispositius_ibfk_3` FOREIGN KEY (`Id_vlan`) REFERENCES `Xarxa` (`Id_vlan`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Dispositius_ibfk_4` FOREIGN KEY (`zona_id`) REFERENCES `Zona` (`Id_zona`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Dispositius_ibfk_5` FOREIGN KEY (`Id_vlan`) REFERENCES `Xarxa` (`Id_vlan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_dispositiu` BEFORE INSERT ON `Dispositius` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM Dispositius 
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        WHERE NomDispositiu = NEW.NomDispositiu AND Zona.idUser_fk = (SELECT idUser_fk FROM Zona WHERE Id_zona = NEW.zona_id)) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir el dispositiu perque ja existeix un dispositiu amb el mateix nom';
    END IF;
    IF (SELECT COUNT(*) FROM Dispositius 
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        WHERE ip = NEW.ip AND Zona.idUser_fk = (SELECT idUser_fk FROM Zona WHERE Id_zona = NEW.zona_id)) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir el dispositiu perque ja existeix un dispositiu amb la mateixa ip';
    END IF;
    IF (SELECT COUNT(*) FROM Dispositius 
        JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
        WHERE mac = NEW.mac AND Zona.idUser_fk = (SELECT idUser_fk FROM Zona WHERE Id_zona = NEW.zona_id)) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir el dispositiu perque ja existeix un dispositiu amb la mateixa mac';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_dispositiuType` AFTER INSERT ON `Dispositius` FOR EACH ROW BEGIN
    IF NEW.deviceType = 'infra' THEN
        INSERT INTO Dispositius_infraestructura (id_dispositiu_fk) VALUES (NEW.id_dispositiu);
    ELSEIF NEW.deviceType = 'final' THEN
        INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (NEW.id_dispositiu);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_dispositiu` BEFORE UPDATE ON `Dispositius` FOR EACH ROW BEGIN
    IF (OLD.`NomDispositiu` != NEW.`NomDispositiu`)
    THEN
        IF (SELECT COUNT(*) FROM Dispositius 
            JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
            WHERE NomDispositiu = NEW.NomDispositiu AND Zona.idUser_fk = (SELECT idUser_fk FROM Zona WHERE Id_zona = NEW.zona_id)) > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar el dispositiu perquè ja existeix un dispositiu amb el mateix nom';
        END IF;
    END IF;
    IF (OLD.ip != NEW.ip) THEN
        IF (SELECT COUNT(*) FROM Dispositius 
            JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
            WHERE ip = NEW.ip AND Zona.idUser_fk = (SELECT idUser_fk FROM Zona WHERE Id_zona = NEW.zona_id)) > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar el dispositiu perquè ja existeix un dispositiu amb la mateixa IP';
        END IF;
    END IF;
    IF ( OLD.mac != NEW.mac ) THEN
        IF (SELECT COUNT(*) FROM Dispositius
            JOIN Zona ON Dispositius.zona_id = Zona.Id_zona
            WHERE mac = NEW.mac AND Zona.idUser_fk = (SELECT idUser_fk FROM Zona WHERE Id_zona = NEW.zona_id)) > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar el dispositiu perquè ja existeix un dispositiu amb la mateixa MAC';
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
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
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  KEY `Estat_ibfk_2_new` (`IdPortInfra_fk`),
  KEY `Estat_ibfk_3` (`Id_vlan_fk`),
  CONSTRAINT `Estat_ibfk_2_new` FOREIGN KEY (`IdPortInfra_fk`) REFERENCES `PortsInfra` (`IdPortInfra`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Estat_ibfk_3` FOREIGN KEY (`Id_vlan_fk`) REFERENCES `Xarxa` (`Id_vlan`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Xarxa`
--

DROP TABLE IF EXISTS `Xarxa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Xarxa` (
  `Id_vlan` int NOT NULL AUTO_INCREMENT,
  `NomXarxa` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DescXarxa` text,
  `idUser_fk` int DEFAULT NULL,
  `Vid` int NOT NULL COMMENT 'el identificador que li posa el usuari a la vlan',
  PRIMARY KEY (`Id_vlan`),
  KEY `Xarxa_ibfk_1` (`idUser_fk`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_xarxa` BEFORE INSERT ON `Xarxa` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM Xarxa WHERE NomXarxa = NEW.NomXarxa AND idUser_fk = NEW.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir la xarxa perque ja existeix una xarxa amb el mateix nom';
    END IF;

    IF (SELECT COUNT(*) FROM Xarxa WHERE `Vid` = NEW.`Vid` AND idUser_fk = NEW.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir la xarxa perque ja existeix una xarxa amb el mateix Vid';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_xarxa` BEFORE UPDATE ON `Xarxa` FOR EACH ROW BEGIN
    IF (OLD.`NomXarxa` != NEW.`NomXarxa`)
    THEN
        IF (SELECT COUNT(*) FROM Xarxa WHERE NomXarxa = NEW.NomXarxa AND idUser_fk = NEW.idUser_fk) > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar la xarxa perque ja existeix una xarxa amb el mateix nom';
        END IF;
    END IF;

    IF (OLD.`Vid` != NEW.`Vid`)
    THEN
        IF (SELECT COUNT(*) FROM Xarxa WHERE  Vid = NEW.Vid AND idUser_fk = NEW.idUser_fk) > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar la xarxa perque ja existeix una xarxa amb el mateix vid';
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `getIdUserBeforeDeleteXarxa` BEFORE DELETE ON `Xarxa` FOR EACH ROW BEGIN
    DECLARE idDefaultXarxa INT;
    -- Get the idUser_fk for the current row before deletion
    SET @idUser := (SELECT idUser_fk FROM `Xarxa` WHERE Id_vlan = OLD.Id_vlan LIMIT 1);
    SET idDefaultXarxa = (SELECT Id_vlan FROM Xarxa WHERE NomXarxa = 'Undefined network' AND idUser_fk = @idUser LIMIT 1);

    -- if estat have more than one Id_vlan_fk UPDATE Estat SET Id_vlan_fk = idDefaultXarxa WHERE Id_vlan_fk IS NULL;
    IF (SELECT COUNT(*) FROM Estat WHERE Id_vlan_fk IS NULL) > 0 THEN
        UPDATE Estat SET Id_vlan_fk = idDefaultXarxa WHERE Id_vlan_fk IS NULL;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `SetDefaultXarxaAfterDelete` AFTER DELETE ON `Xarxa` FOR EACH ROW BEGIN
    DECLARE idDefaultXarxa INT;
    -- Get the id of the default zone for the same user
    SET idDefaultXarxa = (SELECT Id_vlan FROM Xarxa WHERE NomXarxa = 'Undefined network' AND idUser_fk = @idUser LIMIT 1);
    -- if estat have more than one Id_vlan_fk UPDATE Estat SET Id_vlan_fk = idDefaultXarxa WHERE Id_vlan_fk IS NULL;
    IF (SELECT COUNT(*) FROM Estat WHERE Id_vlan_fk IS NULL) > 0 THEN
        UPDATE Estat SET Id_vlan_fk = idDefaultXarxa WHERE Id_vlan_fk IS NULL;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Zona`
--

DROP TABLE IF EXISTS `Zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Zona` (
  `Id_zona` int NOT NULL AUTO_INCREMENT,
  `NomZona` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DescZona` text,
  `idUser_fk` int DEFAULT NULL,
  PRIMARY KEY (`Id_zona`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insert_zona` BEFORE INSERT ON `Zona` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM Zona WHERE NomZona = NEW.NomZona AND idUser_fk = NEW.idUser_fk) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot inserir la zona perque ja existeix una zona amb el mateix nom';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_zona` BEFORE UPDATE ON `Zona` FOR EACH ROW BEGIN
    
    IF ( OLD.`NomZona` != NEW.`NomZona`) THEN
        IF (SELECT COUNT(*) FROM Zona WHERE NomZona = NEW.NomZona AND idUser_fk = NEW.idUser_fk) > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: No es pot modificar la zona perque ja existeix una zona amb el mateix nom';
        END IF;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `getIdUserBeforeDeleteZone` BEFORE DELETE ON `Zona` FOR EACH ROW BEGIN
    -- Get the idUser_fk for the current row before deletion
    SET @idUser := (SELECT idUser_fk FROM `Zona` WHERE Id_zona = OLD.Id_zona LIMIT 1);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `SetDefaultZonaAfterDelete` AFTER DELETE ON `Zona` FOR EACH ROW BEGIN
    DECLARE idDefaultZone INT;
    -- Get the id of the default zone for the same user
    SET idDefaultZone = (SELECT Id_zona FROM Zona WHERE NomZona = 'Undefined location' AND idUser_fk = @idUser LIMIT 1);
    -- Update the zona_id in Dispositius to the default zone id where it is NULL
    UPDATE Dispositius SET zona_id = idDefaultZone WHERE zona_id IS NULL;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `nameUser` varchar(255) NOT NULL,
  `emailUser` varchar(255) NOT NULL,
  `imagePorfileUser` varchar(255) NOT NULL,
  `provider_Auth` varchar(255) NOT NULL,
  `provider_id` varchar(255) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `emailUser` (`emailUser`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Insert_default_data` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    -- Insert default data into the Zona table
    INSERT INTO Zona (NomZona, DescZona, idUser_fk) VALUES ('Undefined location', "It's a DEFAULT undefined location", NEW.idUser);
    -- Insert default data into the Xarxa table
    INSERT INTO Xarxa (NomXarxa, DescXarxa, idUser_fk, Vid) VALUES ('Undefined network', "It's a DEFAULT undefined network", NEW.idUser, 1);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping routines for database 'bbdd_NetDoc'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-12 10:43:45
