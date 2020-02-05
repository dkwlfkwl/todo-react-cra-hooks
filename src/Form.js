import React, { Component } from 'react';

class Form extends Component {
  refInput = React.createRef();

  handleSubmit = (e) => {
    const input = this.refInput.current;
    const value = input.value;
    const isKeyPress = e.type === 'keypress';

    if(isKeyPress) {
      if(e.key !== 'Enter' || value === '') return false;
    } else {
      if(value === '') return false;
    }

    this.props.insertNewTodo(value);

    input.value = '';
    input.focus();
  }

  render() {
    return (
      <div className="header">
        <input type="text" className="new-todo" ref={this.refInput} onKeyPress={this.handleSubmit}/>
        <button type="button" className="btn-submit" onClick={this.handleSubmit}>등록</button>
      </div>
    );
  }
}

export default Form;