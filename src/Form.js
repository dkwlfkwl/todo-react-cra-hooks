import React, { useCallback, useRef } from 'react';

function Form(props) {
  const { insertNewTodo } = props;
  const input = useRef(null);

  const handleSubmit = useCallback(e => {
    const isKeyPress = e.type === 'keypress';
    const inputEl = input.current;
    const value = inputEl.value;

    if(isKeyPress) {
      if(e.key !== 'Enter' || value === '') return false;
    } else {
      if(value === '') return false;
    }

    insertNewTodo(value);

    inputEl.value = '';
    inputEl.focus();
  }, [insertNewTodo]);

  return (
    <div className="header">
      <input type="text" className="new-todo" ref={input} onKeyPress={handleSubmit} />
      <button type="button" className="btn-submit" onClick={handleSubmit}>등록</button>
    </div>
  )
}

export default Form;