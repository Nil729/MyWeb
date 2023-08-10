import pool from "../../../../database/db.connection";
import getIdXarxa from "../xarxa/getIdXarxa";

export async function insertEstatPortInfra(idPortInfra, nomXarxa, vlanConfig) {

    console.log('idPortInfra', idPortInfra, 'nomXarxa', nomXarxa, 'vlanConfig', vlanConfig);

    const idXarxa = await getIdXarxa(nomXarxa); // Call getIdXarxa function to get the idXarxa value

    console.log(nomXarxa, idPortInfra, nomXarxa, vlanConfig);

    pool.query(
        `INSERT INTO Estat (IdPortInfra_fk, Id_vlan_fk, VlanConfig ) VALUES (?, ?, ?)`,
        [idPortInfra, idXarxa, vlanConfig ],
        (err, results) => {
            if (err) {
                console.log('Error Insert Estat Port Infra', err);
            } else {
                console.log('Estat record inserted successfully');
            }
        } 
    )
}