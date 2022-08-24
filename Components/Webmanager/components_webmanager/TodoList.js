import React from "react";
import { TodoItem } from "./TodoItems";
import './Components_style.module.scss'

export function TodoList ({todos, toggleTodo}) { // "{todos}" Vindrien a ser les porpietats
    //llista totes les array [todos]
    //let p = [{"id_app":9,"name_app":"MAgoogle"},{"id_app":11,"name_app":"MBgoogle"},{"id_app":10,"name_app":"TAyoutube"},{"id_app":12,"name_app":"TByutube"}] //Axo ens fa la llista correcte perque el el map es valor 4
    
    //todos.map((todo) =>{console.log(todo)})

    

    return (
        
        <>
            {todos.map((todo) =>(
                
                <TodoItem key= {todo.id} todo={todo} toggleTodo={toggleTodo}/>
            ))}
        </>
        
    );
};