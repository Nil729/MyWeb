import mysql from 'mysql2';


const pool = mysql.createPool({
    host: process.env.HOSTMYSQL,
    port: process.env.PORTMYSQL,
    user: process.env.USERMYSQL,
    password: process.env.PASSMYSQL,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 100
});
export default pool;
