import React, { Component } from 'react';
import Item from './Item';

class List extends Component {

  render() {
    const { todos, moveTodo, toggleCompleted, deleteTodo } = this.props;

    return (
      <ul className="list">
        {todos.map(({ id, title, completed }) => (
          <Item
            key={id}
            id={id}
            title={title}
            completed={completed}
            moveTodo={moveTodo}
            toggleCompleted={toggleCompleted}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    );
  }
}

export default List;