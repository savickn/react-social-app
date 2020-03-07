
import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import styles from './todo.scss';

class ToDoComponent extends React.Component {
  render() {
    return (
      <Panel className={styles['task']}>
        <Panel.Heading> {this.props.title} </Panel.Heading>
        <Panel.Body> {this.props.content} </Panel.Body>
      </Panel>
    );
  }
};

// <p>Hello World!</p>

ToDoComponent.propTypes = {
  //_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  //status: PropTypes.bool.isRequired  
}

export default ToDoComponent;
