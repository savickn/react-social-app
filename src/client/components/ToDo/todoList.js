
import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import ToDoComponent from './todo';

function ToDoList(props) {
  return (
    <ListGroup>
      {props.todos.map((todo, idx) => {
        return (
          <ListGroupItem key={idx}>
            <ToDoComponent title={todo.title} content={todo.content}/>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}

ToDoList.propTypes = {
  /*todos: PropTypes.arrayOf(PropTypes.oneOf([
    PropTypes.instanceOf(ToDoComponent)
  ]))*/
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
}

export default ToDoList;

