import React, { useMemo } from 'react';
import Item from './Item';

function List(props) {
  const { todos, deleteTodo, toggleCompleted, moveTodo } = props;

  // return (
  //   <ul className="list">
  //     {todos.map(({ id, title, completed }) => (
  //       <Item
  //         key={id}
  //         id={id}
  //         title={title}
  //         completed={completed}
  //         moveTodo={moveTodo}
  //         toggleCompleted={toggleCompleted}
  //         deleteTodo={deleteTodo}
  //       />
  //     ))}
  //   </ul>
  // )
  return (
    <ul className="list">
      {useMemo(() => {
        return (
          todos.map(({ id, title, completed }) => (
            <Item
              key={id}
              id={id}
              title={title}
              completed={completed}
              moveTodo={moveTodo}
              toggleCompleted={toggleCompleted}
              deleteTodo={deleteTodo}
            />
          ))
        )
      }, [deleteTodo, moveTodo, todos, toggleCompleted])}
    </ul>
  )
}

export default List;