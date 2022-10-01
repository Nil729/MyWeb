import Image from 'next/image'
import ico_Play from'E:/Projectes/webmanager/Client/src/img/play.png'
import ico_delete from'E:/Projectes/webmanager/Client/src/img/deletevermell.png'
import ico_Update from'E:/Projectes/webmanager/Client/src/img/diskette.png'
import React, {useRef} from 'react';
//import apiClient  from 'E:/Projectes/webmanager/Client/src/http-coomon';

export function AppItems({app, toggleAppdel, toggleAppupdate, toggleplayapp}){

    //<div>APP: {data_task.name_app} URL: {data_task.url_app} TIME: {data_task.time_min}</div>
    //<div>APP: {data_task[0]} URL: {data_task[1]} TIME: {data_task[2]} </div>
    //{data_app.name_app} {data_app.url_app} {data_app.time_hor} {data_app.time_min} {data_app.time_sec} 
    
    /*
        const [state, dispatch] = useReducer(updateApp, [data_app]);   //x => x + 1, 0
    console.log('appItems',state)

    ref= {nameAppRef}
    ref= {urlAppRef}
    ref= {minAppRef}
    onClick={deleteApp}
    onClick={UpdateDataApp}
    */
    const {id_app, name_app, url_app, time_min}= app; 

    const data_appNameRef = useRef();
    const data_appMinRef = useRef();
    const data_appUrlRef = useRef();

 
    const deleteApp= () =>{
        toggleAppdel(id_app);
    };
    const updateApp=()=>{
        const data_appNamevalue  = data_appNameRef.current.value;
        const data_appUrlvalue = data_appUrlRef.current.value;
        const data_appMinvalue  = data_appMinRef.current.value;
        if (data_appNamevalue=== ''  || data_appUrlvalue=== ''  || isNaN(data_appMinvalue) !== false ) return;
        const valuesApp = {data_appNamevalue, data_appUrlvalue, data_appMinvalue, id_app};
        console.log('valuesupdate', valuesApp)
        toggleAppupdate(valuesApp);
    };
    const playApp = () =>{
        toggleplayapp(id_app, url_app, time_min)
    }

    
    return (
        <> 
            <div className='items_applist'>

                <button id='button_playapp' onClick={playApp}><Image className='ico_play' src={ico_Play} alt="playAPP" /></button>

                <div className="form_app_group field">
                    <input className="form_app_field"  type="text" placeholder="App  name"ref= {data_appNameRef} defaultValue={name_app} name="name" id='name' required />
                    <label htmlFor="name" className="form_app_label">Name app</label>
                </div>
                <div className="form_app_group field">
                    <input className="form_app_field"   type="text" placeholder="URL" ref= {data_appUrlRef} defaultValue={url_app} name="URL" id='name' required />
                    <label htmlFor="name" className="form_app_label">URL</label>
                </div>
                <div className="form_app_group field">
                    <input  className="form_app_field" type="text"  placeholder="Time mins" ref= {data_appMinRef} defaultValue={time_min} name="mins" id='name' required />
                    <label htmlFor="name" className="form_app_label">mins</label>
                </div>
                <div className="buttons_group">

                    <button id='button_updateDataApp' onClick={updateApp}><Image className='ico_update' src={ico_Update} alt="updateData" /></button>
                    <button  id='button_deleteApp' onClick={deleteApp} ><Image className='ico_delete' src={ico_delete}  alt="deleteApp"   /></button>
                    
                </div>
            </div>
        </>
    );
};