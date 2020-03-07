
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ToDoList from './todoList';
import ToDoForm from './todoForm';

import { getTodos } from './todoReducer';
import { ADD_TODO, DELETE_TODO, GET_TODOS } from './todoActions';

class ToDoHub extends React.Component {
  
  // this.props and this.context not fully available until 'componentDidMount'
  // used to prefetch data
  constructor(props) {
    super(props);

    /*this.state = {
      todos: [{_id: '1', title: '1st Todo', content: 'Finish React App'}],
    };*/
  };

  componentWillMount() {
    console.log('todos componentWillMount');
    //if(!window){
      //console.log('sent from server')
      this.props.dispatch({type: GET_TODOS});
    //}
  }

  /* working, using component state instead of Redux
  addTodo = (todo) => {
    let todos = [...this.state.todos, todo];
    this.setState({todos});
  };*/
    
  render() {
    return (
      <div>
        <ToDoList todos={this.props.todos} deleteTodo={this.props.deleteTodo} />
        <ToDoForm addTodo={this.props.addTodo} />
      </div>
    );    
  };
};

ToDoHub.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

ToDoHub.contextTypes = {
  router: PropTypes.object.isRequired,
};

// working, used to retrieve state from Redux store
const mapStateToProps = (state) => {
  return {
    todos: getTodos(state),
  };
};

// working, used to bind dispatch to methods
// must return 'dispatch' as prop to access it via 'this.props.dispatch'
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    addTodo: (todo) => dispatch({type: ADD_TODO, todo}),
    deleteTodo: (id) => dispatch({type: DELETE_TODO, id}),
    /*eventually add userId to getTodos*/
    getTodos: () => dispatch({type: GET_TODOS}) 
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoHub);

