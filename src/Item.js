import React, { useEffect, useCallback } from 'react';

function Item(props) {
  const { id, title, completed, deleteTodo, toggleCompleted, moveTodo } = props;

  useEffect(() => {
  }, [completed]);

  const upMoveTodo = useCallback(() => {
    moveTodo(id, 'up');
  }, [moveTodo, id]);

  const downMoveTodo = useCallback(() => {
    moveTodo(id, 'down');
  }, [moveTodo, id]);

  const handleToggleCompleted = useCallback(() => {
    toggleCompleted(id);
  }, [toggleCompleted, id]);

  const handleDeleteTodo = useCallback(() => {
    deleteTodo(id);
  }, [deleteTodo, id]);

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

function areEqual(prevProps, nextProps) {
  const compareCompleted = prevProps.completed === nextProps.completed;

  return compareCompleted;
}

export default React.memo(Item, areEqual);