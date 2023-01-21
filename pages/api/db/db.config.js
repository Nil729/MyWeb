import mysql from "serverless-mysql";

// export default async function handler(req, res) {
    
//     const db = await mysql.createConnection({
//         host: "172.18.0.2", // MYSQL container IP
//         user: "root",
//         port: 3306,
//         password: "12345678",
//         database:"db_web" 
//     });
    
//     db.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//     });

//     try {
//         const [rows, fields] = await db.query('SELECT * FROM users');
//         res.status(200).json(rows);
//     }catch (err) {
//         res.status(500).json({message: err.message});
//     }

// }


const db = mysql({
    config: {
        host: "172.18.0.2", // MYSQL container IP
        user: "root",
        port: 3306,
        password: "12345678",
        database:"db_web"
    },
    library: require('mysql2')
});


export default async function excuteQuery({ query }) {
    try {
      const results = await db.query(query);
      await db.end();
      return results;
    } catch (error) {
        console.error(error);
        return { error: error.message };
      }
}