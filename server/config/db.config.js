
import mysql from "mysql2"

const db = mysql.createConnection({
  host: "172.18.0.2", // MYSQL container IP
  user: "root",
  port: 3306,
  password: "12345678",
  database:"db_web" 
})

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


export default db;