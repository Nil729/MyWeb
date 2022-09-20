import React, { useState, useRef, useEffect, useReducer} from 'react';
import apiClient from '../../../../Services/http-coomon';
import { ListTask } from "./list_task";
import {v4 as uuidv4 } from "uuid";

export function FormRoutin({data_task}){
    //Estilizar a quest div
    //<ul> </ul>

    const {id, task, selected } = data_task;
    const [app, setApp] = useState([]);

    //const [reducerValue, forceUpdate] = useReducer()

    const nameAppRef= useRef();
    const urlAppRef = useRef();
    const minAppRef = useRef();
    
    async function getDataApp() {
        try {
          const resallapps = await apiClient.get(`/user/webmanager/task/${id}`); 
          const app = resallapps.data
          if(app[0].id_app === null) return;
          return setApp(app);
        } catch (err) {
          console.log(err);
        }
    };
    
    useEffect( () => {
        getDataApp()
    }, [app.length]);
    

    //POST
    const postDataApp= () => {
        const name_app = nameAppRef.current.value;
        const url_app = urlAppRef.current.value;
        const time_min = minAppRef.current.value;
        console.log('retrun', isNaN(time_min))
        if (name_app=== ''  || url_app=== ''  || isNaN(time_min) !== false) return;

        const nwapp = {id_app: uuidv4(), name_app, url_app, time_min, task_id: id}

        try {

            (async () => {
                await apiClient.post(`/user/webmanager/task/post/${id}`, nwapp);
            })();
            
            setApp((prevTodos) => {
                return [...prevTodos, {id_app: uuidv4(), name_app, url_app, time_min}]; // posar el estat del delete i el update Aixi: return [...prevTodos, {id_app: uuidv4(), name_app, url_app, time_min appDelete: false, appUpdate: false}];
            });
          
        } catch (err) {
            console.error(err)
        }
        nameAppRef.current.value = null;
        urlAppRef.current.value = null;
        minAppRef.current.value = null;
    };

    const toggleAppupdate= (valuesApp) => {
        updateApp(valuesApp);
    };
    const toggleAppdel= (delappid) => {
        deleteApp(delappid);
    };
    const toggleplayapp= (url_app)=>{
        playOneApp(url_app)
    }
    
    const updateApp= (valuesApp) => {
        try {   
            (async () => {
                await apiClient.put(`/user/webmanager/task/update/${valuesApp.id_app}`,valuesApp);
            })();
        }catch (err){console.log(err)}
    };

    const deleteApp= (delappid) =>{

        const apps = [...app];
        const mypp = apps.find((app) => app.id_app === delappid);
        const filterApps = apps.filter((app) => app !== mypp);

        try {
            (async () => {
                await apiClient.delete(`/user/webmanager/task/delete/${delappid}`,delappid);
                //fer com sigui que agafi la funcio getDataApp() de larxiu form_routin
            })();
        }catch (err){console.log(err)};
        setApp(filterApps)
    }
    const playall = async () =>  {
        try {
            const resallapps = await apiClient.get(`/user/webmanager/task/${id}`);
            const app = resallapps.data
            if(app[0].id_app === null) return;
            app.map((app)=>{
                window.open(app.url_app , "_blank");
                console.log(app)
            });
            return setApp(app);
        } catch (err) {
            console.log(err);
        }

    }
    
    const playOneApp= async (playid, url_app, time_min) =>{
        try {
            const resallapps = await apiClient.get(`/user/webmanager/task/get/${playid}`);
            const app = resallapps.data

            if(app[0].id_app === null) return;

            try{
            
                var appWindow= window.open(app[0].url_app , "_blank");
                setTimeout(function() {
                    closeApp(appWindow)
                }, app[0].time_min*60000);
     
            }catch (err){
                console.error(err)
            }
            return setApp(app);
        } catch (err) {
            console.log(err);
        }
    };

    const closeApp= (appWindow) =>{
        console.log('Close App')
        appWindow.close()
    }; 
    //const getplayApp = ()=>{}
    return (
        <>
        
            <div className="form_Routine">

                <div className="viwRoutin">
                    <div className="taskTitle_playAll">                    
                        <span id="title_task">{task}</span>
                        <button id='button_play_all' onClick={playall}> Play all </button>
                    </div>


                    <div className='container_inputsApp'>

                        <div className="form__group field">
                            <input className="form__field" ref= {nameAppRef} type="text" placeholder="name" name="name" id='name' required />
                            <label htmlFor="name" className="form__label">Name</label>
                        </div>
                        <div className="form__group field">
                            <input className="form__field" ref= {urlAppRef}  type="text" placeholder="URL" name="URL" id='name' required />
                            <label htmlFor="name" className="form__label">URL</label>
                        </div>
                        <div className="form__group field">
                            <input  className="form__field" ref= {minAppRef} type="text"  placeholder="mins" name="mins" id='name' required />
                            <label htmlFor="name" className="form__label">mins</label>
                        </div>

                    </div>
                    <button id='btton_add_app' onClick={postDataApp}> add </button>
                    <ListTask apps= {app} toggleAppdel={toggleAppdel} toggleAppupdate={toggleAppupdate} toggleplayapp={toggleplayapp} />
                    
                </div>
                
            </div>
        </>
    );
};