import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
export function TodoItem({todo, toggleTodo}){
    
    
    const {id, task, selected } = todo;

    const handleTodoClick= () =>{
        toggleTodo(id);
    };
    
    
    return(

        <div className="container_routine">

            <label className="switch">
                <input type="checkbox" checked={selected} onChange={handleTodoClick} />
                <div className="slider round">{task}</div>
            </label> 
            
        </div>
    );
}