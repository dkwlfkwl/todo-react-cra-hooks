import React from 'react';

function Item(props) {
  const { id, title, completed, deleteTodo, toggleCompleted, moveTodo } = props;

  function upMoveTodo() {
    moveTodo(id, 'up');
  }

  function downMoveTodo() {
    moveTodo(id, 'down');
  }

  function handleDeleteTodo() {
    deleteTodo(id);
  }

  function handleToggleCompleted() {
    toggleCompleted(id);
  }

  return (
    <li className={completed ? 'completed' : ''}>
      {title}
      <button type="button" className="btn-up" onClick={upMoveTodo}>위로</button>
      <button type="button" className="btn-down" onClick={downMoveTodo}>아래로</button>
      <button type="button" className="btn-completed" onClick={handleToggleCompleted}>토글</button>
      <button type="button" className="btn-delete" onClick={handleDeleteTodo}>삭제</button>
    </li>
  )
}

export default Item;