-- Crea una funcio que cuan inserim un reguistre a la taula dispositus també linsereixi a la taula diposiitus_infraestructura o dispositus_final segons el seu deviceType
DELIMITER $$
CREATE TRIGGER `insert_dispositiuType` AFTER INSERT ON `Dispositius` FOR EACH ROW BEGIN
    IF NEW.deviceType = 'infra' THEN
        INSERT INTO Dispositus_infraestructura (id_dispositiu_fk) VALUES (NEW.id_dispositiu);
    ELSEIF NEW.deviceType = 'final' THEN
        INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (NEW.id_dispositiu);
    END IF;
END$$

CREATE TRIGGER `update_dispositiuType` AFTER UPDATE ON `Dispositius` FOR EACH ROW BEGIN
    IF NEW.deviceType <> OLD.deviceType THEN
        IF NEW.deviceType = 'infra' THEN
            INSERT INTO Dispositus_infraestructura (id_dispositiu_fk) VALUES (NEW.id_dispositiu);
            DELETE FROM Dispositus_final WHERE id_dispositiu_fk = NEW.id_dispositiu;
        ELSEIF NEW.deviceType = 'final' THEN
            INSERT INTO Dispositus_final (id_dispositiu_fk) VALUES (NEW.id_dispositiu);
            DELETE FROM Dispositus_infraestructura WHERE id_dispositiu_fk = NEW.id_dispositiu;
        END IF;
    END IF;
END$$

-- create a trigger once insert into `ConexioTrunk` or `Coneccio` before insert a `PortsFinal` and `PortsInfra` row
DELIMITER //
CREATE TRIGGER `insert_ports_ConexioTrunk` AFTER INSERT ON `ConexioTrunk` FOR EACH ROW BEGIN
    INSERT INTO PortsFinal (IdPortInfraParent_fk, numPortFinal) VALUES (NEW.IdPortInfraChild_fk, NEW.numPortFinal);
    INSERT INTO PortsInfra (id_dispositiuInfra_fk, numPortInfra) VALUES (NEW.IdPortInfraParent_fk, NEW.numPortInfra);
END;
//
DELIMITER ;

-- create a trigger once update into `ConexioTrunk` or `Coneccio` before update a `PortsFinal` and `PortsInfra` row
CREATE TRIGGER `update_ports_ConexioTrunk` AFTER UPDATE ON `ConexioTrunk` FOR EACH ROW BEGIN
    IF NEW.porta <> OLD.porta THEN
        UPDATE PortsFinal SET id_porta = NEW.porta WHERE id_dispositiu_fk = NEW.id_dispositiu_fk AND id_porta = OLD.porta;
        UPDATE PortsInfra SET id_porta = NEW.porta WHERE id_dispositiu_fk = NEW.id_dispositiu_fk AND id_porta = OLD.porta;
    END IF;
END$$

-- create a trigger once delete into `ConexioTrunk` or `Coneccio` before delete a `PortsFinal` and `PortsInfra` row
CREATE TRIGGER `delete_ports_ConexioTrunk` AFTER DELETE ON `ConexioTrunk` FOR EACH ROW BEGIN
    DELETE FROM PortsFinal WHERE id_dispositiu_fk = OLD.id_dispositiu_fk AND id_porta = OLD.porta;
    DELETE FROM PortsInfra WHERE id_dispositiu_fk = OLD.id_dispositiu_fk AND id_porta = OLD.porta;
END$$

-- create a trigger once insert into  `Coneccio` before insert a `PortsFinal` and `PortsInfra` row
CREATE TRIGGER `insert_ports_conexio` AFTER INSERT ON `Coneccio` FOR EACH ROW BEGIN
    INSERT INTO PortsFinal (id_dispositiu_fk, id_porta) VALUES (NEW.id_dispositiu_fk, NEW.porta);
    INSERT INTO PortsInfra (id_dispositiu_fk, id_porta) VALUES (NEW.id_dispositiu_fk, NEW.porta);
END$$

-- create a trigger once update into  `Coneccio` before update a `PortsFinal` and `PortsInfra` row
CREATE TRIGGER `update_ports_conexio` AFTER UPDATE ON `Coneccio` FOR EACH ROW BEGIN
    IF NEW.porta <> OLD.porta THEN
        UPDATE PortsFinal SET id_porta = NEW.porta WHERE id_dispositiu_fk = NEW.id_dispositiu_fk AND id_porta = OLD.porta;
        UPDATE PortsInfra SET id_porta = NEW.porta WHERE id_dispositiu_fk = NEW.id_dispositiu_fk AND id_porta = OLD.porta;
    END IF;
END$$

-- create a trigger once delete into  `Coneccio` before delete a `PortsFinal` and `PortsInfra` row
CREATE TRIGGER `delete_ports_conexio` AFTER DELETE ON `Coneccio` FOR EACH ROW BEGIN
    DELETE FROM PortsFinal WHERE id_dispositiu_fk = OLD.id_dispositiu_fk AND id_porta = OLD.porta;
    DELETE FROM PortsInfra WHERE id_dispositiu_fk = OLD.id_dispositiu_fk AND id_porta = OLD.porta;
END$$