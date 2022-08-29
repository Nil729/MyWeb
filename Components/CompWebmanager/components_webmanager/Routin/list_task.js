import {AppItems} from './AppItems'
import './style_list_task.module.scss'
export function ListTask({apps, toggleAppdel, toggleAppupdate, toggleplayapp}){
    return (
        
        <>
            <div className='list_appItems'>
                {apps.map((app)=>(
                    <AppItems key={app.id_app} app= {app} toggleAppdel={toggleAppdel} toggleAppupdate={toggleAppupdate} toggleplayapp={toggleplayapp}/>
                ))}
            </div>
            
        </>
            
    );
};
  