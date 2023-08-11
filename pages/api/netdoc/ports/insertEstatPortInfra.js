import pool from "../../../../database/db.connection";
import getIdXarxa from "../xarxa/getIdXarxa";

export async function insertEstatPortInfra(idPortInfra, idXarxa, portStatus) {

    pool.query(
        `INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, VlanConfig ) VALUES (?, ?, ?)`,
        [idPortInfra, idXarxa, portStatus ],
        (err, results) => {
            if (err) {
                console.log('Error Insert Estat Port Infra', err);
            } else {
                console.log('Estat record inserted successfully');
            }
        }
    ) 
}