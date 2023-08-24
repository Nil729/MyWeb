-- Active: 1687107432916@@127.0.0.1@3306@bbdd_NetDoc
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


CREATE TRIGGER `delete_dispositiuType` AFTER DELETE ON `Dispositius` FOR EACH ROW BEGIN
    IF OLD.deviceType = 'infra' THEN
        DELETE FROM Dispositus_infraestructura WHERE id_dispositiu_fk = OLD.id_dispositiu;
    ELSEIF OLD.deviceType = 'final' THEN
        DELETE FROM Dispositus_final WHERE id_dispositiu_fk = OLD.id_dispositiu;
    END IF;
END$$


CREATE TRIGGER INSERT_PORT_INFRA AFTER UPDATE `PortsInfra` FOR EACH ROW BEGUIN
    -- When update a port infra if it port does not exist 