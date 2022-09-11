import cons from "consolidate";
import { renderMatches } from "react-router-dom";
import con from "../config/db.config.js"


/*
    Agafa totes les apps

export const getWebmanager = async (req, res) =>{
    //console.log(decoded)// ens retorna el objecta amb el id
    //const user = await Reguistro.findById(req.userId, {_id: 0, fullName: 0, email: 0});
    //res.render('')
    //res.render("Client/public/index.js");
    //res.json({"hola":["1","2","4"]})

    con.query('SELECT id_app, name_app FROM apps', (err,nameApps) =>{
        if (err) throw err;
        //var name_app =  nameApps.map((app) => Object.values(app))
        res.json(nameApps.map((app) => Object.values(app)))

        //res.json(nameApps.values());
    });
    
    //Inserir consulta

};
*/

/* CONFIGURACIÓ ELIMINAR CASCADA DE FORENKEY id_task
ALTER TABLE `db_web`.`apps` 
DROP FOREIGN KEY `id_task`;
ALTER TABLE `db_web`.`apps` 
ADD CONSTRAINT `id_task`
  FOREIGN KEY (`task_id`)
  REFERENCES `db_web`.`tasks` (`id_task`)
  ON DELETE CASCADE;
*/

export const getWebmanager = async (req, res) =>{
    try {
        con.query('select t.id_task, t.name_task from users as u left join tasks as t on u.id_user = t.user_id WHERE u.id_user= 2 ;', (err,nameApps)=> {

            if (err) throw err;
            res.json(nameApps.map((app)=> Object.values(app)))
            //[[3, Bmati],[4, Btarda]]
        });
    }catch (err) {console.log(err);} 
    // La consulta el qeu fa es relacionar la taula users amb la de tasques li passem el usuari dos i ens retorna les tasques que te a quest usuari
};


export const postTask= async (req, res)=> {

    let task= req.body;
    let userTask= [task.task, 2]

    try {
        //const sqlUpdate = 'INSERT INTO `db_web`.`tasks` (`name_task`, `user_id`) VALUES (?, ?)' 
        con.query('INSERT INTO `db_web`.`tasks` (`name_task`, `user_id`) VALUES (?, ?)', userTask , (err, result)=> {
          if (err) throw err;
        });
        
    } catch (err) {console.log('Error: ', err.message);}
    //res.render('index.html');

    // AAAAAAAAAAAAAAAAAAAAAA? provar de fer amb rutes que cada un dels components tinguin rutes així poder renderizarles i actualizar els components.
    //res.render('users/singup')
};


export const deleteTask= async (req, res)=> {  // fero per la ruta de la tasca :)
    // diria que esta malament NO REB BE EL OBJECTE QEU VOLEM REP UN OBJECTE BUIT
    try{

        const deltask = req.params.id;
        
        const sqlDelete = 'DELETE FROM tasks WHERE (id_task = ? )'
        con.query(sqlDelete, deltask, (err, result)=> {
            if (err) throw err;
        })
        //res.render('index.html');

    } catch (err){ console.log('Error: ', err.message);}
}


export const getTask = async ( req, res)=> {
    
    try {
        var appid = req.params.id
        console.log('id',appid)
        //const querygetTask = 'SELECT p.id_app, p.name_app, t.name_task FROM tasks AS t LEFT JOIN apps AS p ON t.id_task = p.task_id WHERE id_task = ?'
        const querygetTask= 'SELECT p.id_app, p.name_app, p.url_app, p.time_hor, p.time_min, p.time_sec, t.name_task FROM tasks AS t LEFT JOIN apps AS p ON t.id_task = p.task_id WHERE id_task = ?'


        con.query(querygetTask, [appid], (err,nameApps) =>{
            if (err) throw err;
            //console.log(nameApps[0].id_app);
            //if (nameApps[0].id_app === null) return;
            res.json(nameApps);
            //res.json(nameApps.map((app)=> Object.values(app)))
        });


        
    }catch (err) {console.log(err);} 
    // La consulta el qeu fa es relacionar la taula users amb la de tasques li passem el usuari dos i ens retorna les tasques que te a quest usuari
};

export const getApp = async (req, res)=>{
    try {
        var idoneapp = req.params.id
        const sqlgetapp = 'select * FROM  db_web.apps WHERE id_app= ?'

        con.query(sqlgetapp, idoneapp, (err, paramsapp)=> {
            if (err) throw err;
            return res.json(paramsapp);
        });
    } catch (err) {console.log('Error: ', err.message);}
};

export const postApp= async (req, res)=> {
    let app = req.body;
    let dataApp= [app.name_app, app.url_app, app.time_hor, app.time_min, app.time_sec, app.task_id ];
    try {
        const sqlPostData = 'INSERT INTO `db_web`.`apps` (`name_app`, `url_app`, `time_hor`, `time_min`, `time_sec`, `task_id`) VALUES (?, ?, ?, ?, ?, ?)' 
        con.query(sqlPostData, dataApp, (err, result)=> {
          if (err) throw err;
        });
    } catch (err) {console.log('Error: ', err.message);}
    //res.render('index.html');
};

export const updateApp= async (req, res)=>{
    let app= req.body;
    let update_elements = [app.data_appNamevalue, app.data_appUrlvalue, app.data_appHorvalue, app.data_appMinvalue, app.data_appSecvalue, app.id_app];
    console.log('Data update',app);

    try {

        const sqlUpdatedata= 'UPDATE db_web.apps SET name_app = ?, url_app= ?, time_hor= ?, time_min= ?, time_sec= ? where id_app= ?'
        con.query(sqlUpdatedata, update_elements, (err, result)=> {
            if (err) throw err;
        });
    } catch (err) {console.log('Error: ', err.message);}
    //res.render('index.html');
};

export const deleteApp= async(req,res)=> {
    try{
        let delapp = req.params.id;
        let sqlAppdelete = 'DELETE FROM  db_web.apps WHERE id_app= ?' 
        con.query(sqlAppdelete, delapp, (err, result)=> {
            if (err) throw err;
        })
    }catch (err){ console.log('Error: ', err.message);}
    //res.render('index.html');
};
