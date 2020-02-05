import React, { Component } from 'react';

class Item extends Component {

  shouldComponentUpdate(nextProps){
    const changeId = this.props.id !== nextProps.id;
    const changeTitle = this.props.title !== nextProps.title;
    const changeCompleted = this.props.completed !== nextProps.completed;

    return (
      changeId ||
      changeTitle ||
      changeCompleted
    )
  }

  upMoveTodo = () => {
    this.props.moveTodo(this.props.id, 'up');
  }

  downMoveTodo = () => {
    this.props.moveTodo(this.props.id, 'down');
  }

  handleToggleCompleted = () => {
    this.props.toggleCompleted(this.props.id);
  }

  handleDeleteTodo = () => {
    this.props.deleteTodo(this.props.id);
  }

  render() {
    const { title, completed } = this.props;

    return (
      <li className={completed ? 'completed' : ''}>
        {title}
        <button type="button" className="btn-up" onClick={this.upMoveTodo}>위로</button>
        <button type="button" className="btn-down" onClick={this.downMoveTodo}>아래로</button>
        <button type="button" className="btn-completed" onClick={this.handleToggleCompleted}>토글</button>
        <button type="button" className="btn-delete" onClick={this.handleDeleteTodo}>삭제</button>
      </li>
    );
  }
}

export default Item;