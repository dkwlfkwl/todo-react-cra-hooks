import React, { useRef } from 'react';

function Form(props) {
  const input = useRef(null);

  const handleSubmit = function(e) {
    const isKeyPress = e.type === 'keypress';
    const inputEl = input.current;
    const value = inputEl.value;

    if(isKeyPress) {
      if(e.key !== 'Enter' || value === '') return false;
    } else {
      if(value === '') return false;
    }

    props.insertNewTodo(value);

    inputEl.value = '';
    inputEl.focus();
  }

  return (
    <div className="header">
      <input type="text" className="new-todo" ref={input} onKeyPress={handleSubmit} />
      <button type="button" className="btn-submit" onClick={handleSubmit}>등록</button>
    </div>
  );
}

// class Form extends Component {
//   refInput = React.createRef();

//   handleSubmit = (e) => {
//     const input = this.refInput.current;
//     const value = input.value;
//     const isKeyPress = e.type === 'keypress';

//     if(isKeyPress) {
//       if(e.key !== 'Enter' || value === '') return false;
//     } else {
//       if(value === '') return false;
//     }

//     this.props.insertNewTodo(value);

//     input.value = '';
//     input.focus();
//   }

//   render() {
//     return (
//       <div className="header">
//         <input type="text" className="new-todo" ref={this.refInput} onKeyPress={this.handleSubmit}/>
//         <button type="button" className="btn-submit" onClick={this.handleSubmit}>등록</button>
//       </div>
//     );
//   }
// }

export default Form;