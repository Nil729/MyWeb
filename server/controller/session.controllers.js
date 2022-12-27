import jwt from "jsonwebtoken";
import {serialize} from "cookie";


import con from "../config/db.config.js";
import { getMaxAge } from "next/dist/server/image-optimizer.js";



export const login = (req, res) => {
  const {username, password} = req.body;
  if (username == 'admin' && password == 'admin'){

    jwt.sign({  
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // Token sera valid per 1h
      // Haure de Crear una consulta a la db que ens dongui certes credencials
      email: '',
      username: '',

    }, 'secret') // crear una .env que hi hagui a queta clau secreta
    const serialized = serialize('myToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production',
      sameSite: 'none',
      maxAge: 1000 * 60 * 60,
      path: '/'
    });

    res.cookie("x-access-token", token);
    //res.redirect('http://localhost:3002/home');
    return res.json('login succerfull');
  }

  res.status(401).json({erro:'login failed'});


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
};

export const singup = async (req,res) => {
  let userSingupForm = req.body;
  const dataUserForm= [userSingupForm.userName, userSingupForm.userFullName, userSingupForm.userEmail, userSingupForm.userPSW];
  try {
      const sqlPostDataUserSingup = 'INSERT INTO `db_web`.`users` (`user_name`, `full_name`, `email`, `user_psw`) VALUES (?, ?, ?, ?)';
      con.query(sqlPostDataUserSingup, dataUserForm, (err, result)=> {
        if (err) throw err;
      });

  } catch (err) {console.log('Error: ', err.message)};
};