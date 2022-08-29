import con from "./db.config.js"

con.query('SELECT name_app FROM apps', (err,nameApps) =>{
    if (err) throw err;
    
    console.log('Data received from Db:',Object.values(nameApps));
});


const querygetApps= 'SELECT p.id_app, p.name_app, p.url_app, p.time_hor, p.time_min, p.time_sec, t.name_task FROM tasks AS t LEFT JOIN apps AS p ON t.id_task = p.task_id WHERE id_task = ?'
var getTask = 
con.query(querygetApps, getTask, (err,nameApp) =>{

    if (err) throw err;
    console.log('c',Object.values(nameApp))
    //[[3, Bmati],[4, Btarda]]
});
