import pool from "../../../../database/db.connection";


export async function getIdPortInfra(id_dispositiu, numPortInfra) {
    console.log('id_dispositiu: ', id_dispositiu, 'numPortInfra: ', numPortInfra);
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT IdPortInfra FROM PortsInfra WHERE id_dispositiuInfra_fk = ? AND numPortInfra = ?`,
            [id_dispositiu, numPortInfra],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('results: ', results);
                    resolve(results);
                }
            }
        );
    });
}

export async function getIdPortFinal(id_dispositiu, numPortFinal) {
    console.log('id_dispositiu: ', id_dispositiu);
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT IdPortFinal FROM PortsFinal WHERE id_disposituFinal_fk = ? AND numPortFinal = ?`,
            [id_dispositiu, numPortFinal],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('results: ', results);
                    resolve(results);
                }
            }
        );
    });
}



