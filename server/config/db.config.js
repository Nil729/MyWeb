
import mysql from "mysql2"

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "nilpinyana",
  database:"db_web" 
})

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


export default db;