import con from "../config/db.config.js"


export const login = (req, res) => {
  return res.json('login')
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

  } catch (err) {console.log('Error: ', err.message);};
};