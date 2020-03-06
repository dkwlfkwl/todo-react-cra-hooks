import React, { useCallback } from 'react';

function Item(props) {
  const { id, title, completed, deleteTodo, toggleCompleted, moveTodo } = props;

  const upMoveTodo = useCallback(() => {
    moveTodo(id, 'up');
  }, [moveTodo, id]);

  const downMoveTodo = useCallback(() => {
    moveTodo(id, 'down');
  }, [moveTodo, id]);

  const handleDeleteTodo = useCallback(() => {
    deleteTodo(id);
  }, [deleteTodo, id]);

  const handleToggleCompleted = useCallback(() => {
    toggleCompleted(id);
  }, [toggleCompleted, id]);

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