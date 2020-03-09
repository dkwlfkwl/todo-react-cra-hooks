import React from 'react';
import Item from './Item';

function List(props) {
  const { todos, deleteTodo, toggleCompleted, moveTodo } = props;

  return (
    <ul className="list">
      {todos.map(({ id, title, completed }, index) => (
        <Item
          key={id}
          index={index}
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

export default List;