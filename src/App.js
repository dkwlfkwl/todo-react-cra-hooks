/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import Form from './Form';
import List from './List';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: '1', completed: true },
    { id: 2, title: '2', completed: false },
    { id: 3, title: '3', completed: true },
    { id: 4, title: '4', completed: false }
  ]);

  // useEffect(() => {
  //   localStorage.setItem('todolist', JSON.stringify(todos));

  //   return () => {
  //     localStorage.setItem('todolist', JSON.stringify(todos));
  //   };
  // }, [todos]);

  const insertNewTodo = useCallback(value => {
    const newItem = {
      id: new Date().valueOf(),
      title: value.trim(),
      completed: false
    };

    setTodos(() => [...todos, newItem]);
  }, [todos]);

  const deleteTodo = useCallback(id => {
    setTodos(() => todos.filter((item) => item.id !== id));
  }, [todos]);

  const toggleCompleted = useCallback(id => {
    setTodos(() => todos.map((item) => {
      if(item.id === id) item.completed = !item.completed;

      return item;
    }));
  }, [todos]);

  const moveTodo = useCallback((id, dir) => {
    const targetIndex = todos.findIndex(item => item.id === id);
    const direction = dir === 'up' ? -1 : 1;
    const insertIndex = targetIndex >= 0 ? targetIndex + direction : targetIndex;

    if(targetIndex === 0 && direction === -1) {
      return false;
    } else if(targetIndex === todos.length - 1 && direction === 1) {
      return false;
    }

    setTodos(() => {
      console.log(targetIndex)
      console.log(insertIndex)
      console.log(todos.splice(targetIndex, 1)[0])
      console.log(todos)
      todos.splice(insertIndex, 0, todos.splice(targetIndex, 1)[0]);

      return todos
    });
  }, [todos]);

  return (
    <div className="todo">
      <Form insertNewTodo={insertNewTodo} />
      <List
        todos={todos}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
        moveTodo={moveTodo}
      />
    </div>
  )
}

export default App;