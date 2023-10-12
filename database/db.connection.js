import mysql from 'mysql2';


const pool = mysql.createPool({
    host: process.env.HOSTMYSQL,
    user: process.env.USERMYSQL,
    password: process.env.PASSMYSQL,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
export default pool;
