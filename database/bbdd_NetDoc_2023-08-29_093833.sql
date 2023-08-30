-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: bbdd_NetDoc
-- ------------------------------------------------------

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
  CONSTRAINT `Dispositius_ibfk_4` FOREIGN KEY (`zona_id`) REFERENCES `Zona` (`Id_zona`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Dispositius_ibfk_5` FOREIGN KEY (`Id_vlan`) REFERENCES `Xarxa` (`Id_vlan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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