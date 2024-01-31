import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const descriptionInputRef = useRef(null);

  const handleAddTodo = () =>{
    let newTodoItem = {
      title:newTitle,
      description: newDescription
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  }

  const handleDeleteTodo = (index) =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  const handleClearFields = () => {
    // Clear the input fields
    setNewTitle("");
    setNewDescription("");
  }

  const handleEnterKeyPress = (e) => {
    if(e.key==='Enter'){
      if (e.target.name === 'title') {
        // If the "Enter" key is pressed in the title input, focus on the description input
        descriptionInputRef.current.focus();
      } else {
        handleAddTodo();
      }
      
    }
  }

  const handleTabKeyPress = (e) => {
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
      if (e.target.name === 'title') {
        descriptionInputRef.current.focus();
      }
    }
  }


  useEffect(()=> {
    let savedTodos = JSON.parse(localStorage.getItem('todolist'));
    if(savedTodos){
      setTodos(savedTodos);
    }
  },[])

  return (
    <div className="App">
      <h1>MY TODOS</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input 
            name="title"
            type="text" 
            value={newTitle} 
            onChange={(e)=>setNewTitle(e.target.value)} 
            placeholder="Enter your Title Here" 
            onKeyDown={handleTabKeyPress} />
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input 
            type="text"
            name='description' 
            onChange={(e) => setNewDescription(e.target.value)} 
            value={newDescription} 
            ref={descriptionInputRef} 
            placeholder="Enter your Description Here" 
            onKeyDown={handleEnterKeyPress} />
          </div>

          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
            <button type="button" onClick={handleClearFields} className="primaryBtn">Clear</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn isCompleteScreen ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn isCompleteScreen ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          {allTodos.map((item,index) => {
            return(
              <div className='todo-list-item' key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div>
              <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?' />
              <BsCheckLg className='check-icon' title='Completed?' />
            </div>
          </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
