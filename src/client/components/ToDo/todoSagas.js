
import { takeEvery, put, call, fork } from 'redux-saga/effects';
import axios from '../../util/axiosCaller';

export function* addTodoWatcher() {
  yield takeEvery('SUBMIT_TODO', addTodoHandler);
}

function addTodo(todo) {
  return axios.post('/api/todos/', {
    todo
  })
  .then(res => res.data )
  .catch(err => { 
    throw err; 
  })
}

function* addTodoHandler(action) {
  try {
    yield put({type: 'ADD_TODO_REQUEST'});
    const response = yield call(addTodo, action.todo);
    yield put({type: 'ADD_TODO_SUCCESS', todo: response.todo});
    yield put({type: 'NEW_ALERT', alert: {type: 'success', message: 'Todo Added!'}});
  } catch(errors) {
    yield put({type: 'ADD_TODO_FAILURE', errors})
  }
}

export function* getTodosWatcher() {
  yield takeEvery('GET_TODOS', getTodosHandler);
}

function getTodos() {
  console.log('getTodos called');
  return axios.get('/api/todos/')
  .then((res) => res.data)
  .catch((err) => {
    throw err;
  })
}

function* getTodosHandler(action) {
  console.log('getTodoHandler called');
  try {
    yield put({type: 'GET_TODOS_REQUEST'});
    const response = yield call(getTodos);
    yield put({type: 'GET_TODOS_SUCCESS', todos: response.todos});
  } catch(errors) {
    yield put({type: 'GET_TODOS_FAILURE', errors});
  }
}

export default [
  fork(addTodoWatcher),
  fork(getTodosWatcher),
];