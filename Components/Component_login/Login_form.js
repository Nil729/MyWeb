import { useState } from "react";
import apiClient  from '../../Services/http-coomon';


export default function LoginForm(){

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handlechanges = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value, // e.target.value = nil e.target.name = user_name (name input)
        })
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();  // Catch a default e value
        const resposne = await apiClient.post('/user/login', credentials);// s'ha de canviar a questa ruta per post a tooots.
        console.log(resposne);
    }


    return (
        <> 
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="username" id="useName" type="text"
                        onChange={handlechanges}
                    /> 
                    <input name="password" id="userPsw" type="password"
                        onChange={handlechanges}
                    />
                    <button>login</button>
                </form>
            </div>
        </>
    );
};