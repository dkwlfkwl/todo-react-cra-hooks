import React, { useState, useEffect, useCallback } from 'react';
import Form from './Form';
import List from './List';

function App() {
  const localStorageData = JSON.parse(localStorage.getItem('todolist')); // 한번만 작동하게
  const [todos, setTodos] = useState(localStorageData !== null ? localStorageData : []);

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todos));
  }, [todos]);

  const insertNewTodo = useCallback(value => {
    const newItem = {
      id: new Date().valueOf(),
      title: value.trim(),
      completed: false
    };

    setTodos(() => [...todos, newItem]);
  }, [todos]);

  const moveTodo = useCallback((id, dir) => {
    const direction = dir === 'up' ? -1 : 1;
    const targetIndex = todos.findIndex(item => item.id === id);
    const insertIndex = targetIndex >= 0 ? targetIndex + direction : targetIndex;

    if(targetIndex === 0 && direction === -1) {
      return false;
    } else if(targetIndex === todos.length - 1 && direction === 1) {
      return false;
    }

    setTodos(() => {
      todos.splice(insertIndex, 0, todos.splice(targetIndex, 1)[0]);

      return [...todos];
    });
  }, [todos]);

  const toggleCompleted = useCallback(id => {
    setTodos(() => todos.map((item) => {
      if(item.id === id) item.completed = !item.completed;

      return item;
    }));
  }, [todos]);

  const deleteTodo = useCallback(id => {
    setTodos(() => todos.filter((item) => item.id !== id));
  }, [todos]);

  return (
    <div className="todo">
      <Form insertNewTodo={insertNewTodo} />
      <List
        todos={todos}
        moveTodo={moveTodo}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
      />
    </div>
  )
}

export default App;