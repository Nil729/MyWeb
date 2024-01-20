import {useRef} from 'react';
import apiClient  from '../../Services/http-coomon';

export default function SingupForm(){
    const data_userName = useRef();
    const data_fullName = useRef()
    const data_userEmail = useRef();
    const data_userPSW = useRef();


    const SingupFormPost = async () => {

        const userName  = data_userName.current.value;
        const userFullName  = data_fullName.current.value;
        const userEmail = data_userEmail.current.value;
        const userPSW  = data_userPSW.current.value;

        const singupFom_data = {userName, userFullName, userEmail, userPSW};

        try {
            await apiClient.post('/user/signup', singupFom_data);
        } catch(err){console.error(err)}
    };

    return (
        <> 
            <div>
                <input  ref={data_userName} type="text" id="userName" placeholder='name'/>
                <input  ref={data_fullName} type="text" id="userFullname" placeholder='full name'/>
                <input  ref={data_userEmail} type="text" id="userEmail" placeholder='email'/>
                <input  ref={data_userPSW} type="text" id="userPSW" placeholder='psw'/>
                
                <input type="submit" onClick={SingupFormPost}></input>
 
            </div>
        </>
    );
};