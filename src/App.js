import React, { Component } from 'react';
import Form from './Form';
import List from './List';

class App extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    const localStorageItem = localStorage.getItem('todolist');

    if(localStorageItem !== null) {
      this.setState(() => ({
        todos: JSON.parse(localStorageItem)
      }));
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todolist', JSON.stringify(this.state.todos));
  }

  insertNewTodo = (value) => {
    const newItem = {
      id: new Date().valueOf(),
      title: value.trim(),
      completed: false
    };

    this.setState(() => ({
      todos: this.state.todos.concat(newItem)
    }));
  }

  deleteTodo = (id) => {
    this.setState((state) => ({
      todos: state.todos.filter((item) => (item.id !== id))
    }));
  }

  toggleCompleted = (id) => {
    this.setState((state) => ({
      todos: state.todos.map((item) => {
        if(item.id === id) item.completed = !item.completed;

        return item;
      })}
    ));
  }

  moveTodo = (id, dir) => {
    const targetIndex = this.state.todos.findIndex(item => item.id === id);
    const direction = dir === 'up' ? -1 : 1;
    const insertIndex = targetIndex >= 0 ? targetIndex + direction : targetIndex;

    if(targetIndex === 0 && direction === -1) {
      if(targetIndex === this.state.todos.length - 1 && direction === 1) {
        return false;
      }
    }

    this.setState((state) => {
      state.todos.splice(insertIndex, 0, state.todos.splice(targetIndex, 1)[0]);

      return {
        todos: state.todos
      }
    });
  }

  render() {
    return (
      <div className="todo">
        <Form insertNewTodo={this.insertNewTodo} />
        <List
          todos={this.state.todos}
          moveTodo={this.moveTodo}
          toggleCompleted={this.toggleCompleted}
          deleteTodo={this.deleteTodo}
        />
      </div>
    )
  }
}

export default App;