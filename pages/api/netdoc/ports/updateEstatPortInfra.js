import pool from "../../../../database/db.connection";

export async function updateEstatPortInfra(idPortInfra, idXarxa, portStatus) {

    pool.query(
        `UPDATE Estat SET 
            IdPortInfra_fk = ?,
            Id_vlan_fk = ?,
            VlanConfig = ?
            WHERE IdPortInfra_fk = ?`,
        [idPortInfra, idXarxa, portStatus, idPortInfra],
        (err) => {
            if (err) {
                console.log('Error updating Estat Port Infra', err);
            } else {
                console.log('Estat record updated successfully');
            }
        }
    ) 
}

export async function deleteEstatPortInfra(idPortInfra){

    pool.query(
        `DELETE FROM Estat WHERE IdPortInfra_fk = ?`,
        [idPortInfra],
        (err) => {
            if (err) {
                console.log('Error deleting Estat Port Infra', err);
            } else {
                console.log('Estat record deleted successfully');
            }
        }
    )

}