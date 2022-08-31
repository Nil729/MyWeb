import React, { useState, useRef, useEffect} from 'react';
//import './App.css';
import apiClient  from './http-coomon';
import litter from 'e:/Projectes/webmanager/Client/src/img/litter.png';
import {v4 as uuidv4 } from "uuid";
import {TodoList} from './components_webmanager/TodoList';
import {ViewRoutin} from './components_webmanager/Routin/ViewRoutin';

//import { Route } from 'react-router-dom';

//import { useReducer } from 'react';
//import { BrowserRouter as Router, Route } from "react-router-dom";
// Si es posa molt xunga la cosa crear un nou component per el tema dels todos
export function Webmanager () {
  const [todos, setTodos] = useState([]);
  const todoTaskRef = useRef();
  
  //GET a API
  const getData = async () => {
    try {
      const resalltasks = await apiClient.get("/user/webmanager");
      const app = resalltasks.data
      return app
    } catch (err) {
      console.log(err);
    }
  };
  
 // PER FER AIXÓ S'HA DE SER EL PUTU AMO (: (: (: (: (: (: 
 // Recomvarteix el objecte utilizant i linserta a la array todos
 //Utilizem el useEffect cuan volem inserir algo a mitg del proces (NO HO SE DEL TOT SEGUR  PRO HO UTILIZO PER NOMES FER LA FUNCIÓ UN COP (:)
  useEffect( () => { 
    const setdata = async () => {
      var fdata = await getData()

      const nwobj = fdata.map((element) => {
        return {id: element[0], task: element[1]}
      })
      return setTodos(nwobj)
    }
    setdata()
  }, [todos.length]); // aixo funciona pero... gasta no es gaire eficent
  
  //POST
  const postData = () =>{
    const task = todoTaskRef.current.value;
    if (task === "") return;
    const nwtask = {id: uuidv4(), task, selected: false }
    console.log(nwtask)
    try {
      (async () => {
        await apiClient.post('/user/webmanager/post', nwtask); 
      })();

      setTodos((prevTodos) => {
        return [...prevTodos, {id: uuidv4(), task, selected: false }];
      });
    } catch (err) {
      console.error(err)
    }
    todoTaskRef.current.value = null;
  }

  const toggleTodo= (id) => {
    const newTodos = [...todos];// Copia del estat enterior del objecte todos
    const d = newTodos.filter((todo) => todo.selected === true);
    const todo = newTodos.find((todo) => todo.id === id); // Busquem els objectes que fomen el todo amb el id
  
    if (d.length === 0){
      todo.selected = !todo.selected;
      console.log("a")
    }else if (d.length !== 0){
      todo.selected = d[0].selected;
      d[0].selected = !d[0].selected;
      console.log("b")
    }
    setTodos(newTodos);
  };


  const handletoClearAll = () =>{
    const newTodos = todos.filter((todo) => !todo.selected);
    const delTodo = todos.filter((todo) => todo.selected);

    try {
      (async () => {
        console.log(delTodo[0].id);
        await apiClient.delete(`/user/webmanager/delete/${delTodo[0].id}`, delTodo[0].id);
      })();
    } catch (err) {
      console.error(err)
    }
    setTodos(newTodos)
  }


  //Fer que per cada tasca es creei una ruta
  return (
    <>
      <link rel="icon" href="./Client/public/litter.png"></link>
      <div className='content' >
        <div className='container_CRUD top'>
          <div className='todoRoutine'>
            <span className="title_todoRoutine">Crear Rutina</span>
            <input className='input_newRoutine' ref= {todoTaskRef} type = "text" placeholder= "New Routine" />
            <button className='button_add' onClick={postData}>+</button>
          </div>
          <div className='myRoutines'>
            <span className="TitulRutina">Mis Rutinas</span>
              <div id='containerTodoList'>
                <TodoList todos={todos} toggleTodo= {toggleTodo}/>
              </div>
              <button id='button_deleteRutin'><img className='img_litter' src={litter} onClick={handletoClearAll} /></button>
          </div>
        </div>
        <ViewRoutin routin ={todos}/>
      </div>
    </>
  );
}