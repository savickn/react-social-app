import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE,
  DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE, 
  GET_TODOS_REQUEST, GET_TODOS_SUCCESS, GET_TODOS_FAILURE } from './todoActions';

//{_id: 1, title: '1st Todo', content: 'Finish app'}

const initialState = {
  status: 'standby',
  data: [],
  errors: {}
};

/* Reducer */

// cannot omit fields when returning 'state'
const TodoReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO_REQUEST:
      return {
        status: 'pending',
        data: [...state.data],
        errors: {}
      };
    case ADD_TODO_SUCCESS:
      return {
        status: 'standby',
        data: [...state.data, action.todo],
        errors: {},
      };
    case ADD_TODO_FAILURE:
      return {
        status: 'error',
        data: [...state.data],
        errors: action.errors,
      };
    case GET_TODOS_REQUEST:
      return Object.assign({}, state, {
        status: 'pending',
        errors: {}
      });  
    case GET_TODOS_SUCCESS:
      return Object.assign({}, state, {
        status: 'standby',
        data: [...action.todos],
      });
    case GET_TODOS_FAILURE:
      return Object.assign({}, state, {
        status: 'error',
        errors: action.errors
      });
    /*case DELETE_TODO:
      return {
        data: state.data.filter(todo => todo.cuid !== action.cuid),
      };*/
    default:
      return state;
  }
}

export const getTodos = (state) => state.todos.data;
export const getTodo = (state, cuid) => state.todos.data.filter(td => td._id === cuid)[0];

export const getErrors = (state) => state.todos.errors;

export default TodoReducer;
