
import React from 'react';
import PropTypes from 'prop-types';

import styles from './todoForm.scss';

class ToDoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.titleRef = React.createRef();
    this.contentRef = React.createRef();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    let todo = {
      title: this.titleRef.current.value,
      content: this.contentRef.current.value,
    };
    this.props.addTodo(todo);
    this.titleRef.current.value = '';
    this.contentRef.current.value = '';
  }

  render() {
    return (
      <form className={styles['todoForm']} onSubmit={this.handleSubmit}>
        <h2 className={`${styles.task} ${styles.todoHeader}`}>Add a new ToDo note.</h2>
        <div>
          <label htmlFor='todoTitle'>Title: </label>
          <input type='text' id='todoTitle' className='form-control' ref={this.titleRef}/>
        </div>
        <div>
          <label htmlFor='todoContent'>Content: </label>
          <input type='text' id='todoContent' className='form-control' ref={this.contentRef}/>
        </div>
        <button type='submit' className="btn btn-default">Submit</button>
      </form>
    );
  }
}

ToDoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default ToDoForm;
