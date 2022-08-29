
import mysql from "mysql2"

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database:"db_web" 
})

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


export default db;