import { useState } from "react";
import {useRouter} from "next/router";
import axios from 'axios';


export default function LoginForm(){
    const router = useRouter()
    const [credentials, setCredentials] = useState({
        username: 'admin', 
        password: 'admin'
    });

    const handlechanges = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value, // e.target.value = nil e.target.name = user_name (name input)
        })
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();  // Catch a default e value
        console.log(credentials)
        const resposne = await axios.post('/api/auth/login', credentials);// s'ha de canviar a questa ruta per post a tooots.
        router.push('/home');
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