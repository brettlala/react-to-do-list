import React from 'react';

export default function Todo({ todo, toggleTodo }) {

    function handleClick() {
        toggleTodo(todo.id)
    }

  return (
    <div>
        <label onChange={handleClick}>
            <input type='checkbox' checked={todo.complete} />
            {todo.name}
        </label>
    </div>
  )
}
