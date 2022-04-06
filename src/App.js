import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todos, setTodos] = useState([]);
  const toDoNameRef = useRef();
  const LOCAL_STORAGE_KEY = 'todos';

  useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(storedTodos) setTodos(storedTodos);
    }, []);

  useEffect(() => {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos]);

  function handleAddTodo() {
    const newTodo = toDoNameRef.current.value;

    if(newTodo === '') return;

    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: newTodo, complete: false}]
    })

    toDoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input type='textbox' ref={toDoNameRef}/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
