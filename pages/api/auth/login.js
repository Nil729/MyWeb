import jwt from "jsonwebtoken";
import {serialize} from "cookie";



export default function login(req, res){

  const {username, password} = req.body;

  if (username == 'admin' && password == 'admin'){ // a questa validació s'ha de fer a la db

    const token = jwt.sign({  
      exp: Math.floor(Date.now() / 1000) + (60 * 60) , // Token sera valid per 1h
      // Haure de Crear una consulta a la db que ens dongui certes credencials
      email: 'admin@admin.com',
      username: 'nil',
    }, 'secret') // crear una .env que hi hagui a queta clau secreta

    const serialized = serialize('myToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
      path: '/'
    })
    try {
      res.setHeader('Set-Cookie', serialized);
    } catch (err) {console.log('Error: ', err.message)};


    
    return res.status(200).json({message: 'login succerfull'});
  }

  res.status(401).json({erro:'login failed'});
};

/*
let userForm = req.body;
let dataUserFormLogin= [userForm.username, userForm.userpsw];
try {
    const sqlPostDataUserLogin = 'INSERT INTO `db_web`.`users` (`user_name`, `user_password`, `user_id`) VALUES (?, ?, ?)';
    con.query(sqlPostDataUserLogin, dataUserFormLogin, (err, result)=> {
      if (err) throw err;
    });
} catch (err) {console.log('Error: ', err.message);};
*/