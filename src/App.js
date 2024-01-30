import './App.css';
import React, { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  return (
    <div className="App">
      <h1>MY TODOS</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" placeholder="Enter your Title Here"></input>
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" placeholder="Enter your Description Here"></input>
          </div>

          <div className="todo-input-item">
            <button type="button" className="primaryBtn">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn isCompleteScreen ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn isCompleteScreen ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          <div className='todo-list-item'>
            <div>
              <h3>TASK 01</h3>
              <p>Description</p>
            </div>
            <div>
              <AiOutlineDelete className='icon'title='Delete?' />
              <BsCheckLg className='check-icon' title='Completed?' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
