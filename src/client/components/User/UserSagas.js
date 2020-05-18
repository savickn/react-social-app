
import { FETCH_USER_REQUEST, SIGN_UP_REQUEST, SEARCH_USERS_REQUEST, UPDATE_USER_REQUEST, DELETE_USER_REQUEST, } from './UserActions';

import {
  fetchUserSuccess, 
  signUpSuccess, signUpFailure,
  searchUsersSuccess, searchUsersFailure,
  updateUserSuccess, updateUserFailure,
  deleteUserSuccess, deleteUserFailure,
} from './UserActions';

import axios from '../../util/axiosCaller';
import { setAuthToken } from '../../util/AuthService';
import { takeLatest, put, call, fork } from 'redux-saga/effects';

/* AJAX REQUESTS */

const fetchUser = (id) => {
  return axios.get(`api/users/${id}`)
    .then(res => res.data)
    .catch(err => { throw err; })
}

const searchUsersAjax = (query) => {
  return axios.get('api/users/', { params: query })
  .then(res => res.data)
  .catch((err) => { throw err; })
}

const addUserAjax = (user) => {
  return axios.post('api/users/', user)
  .then(res => res.data )
  .catch(err => { throw err; })
}

const updateUserAjax = (user) => {
  return axios.put(`api/users/${user._id}`, user)
  .then(res => res.data)
  .catch(err => { throw err; })
}

const deleteUserAjax = (userId) => {
  return axios.delete(`api/users/${userId}`)
  .then(res => res.data)
  .catch(err => { throw err; })
}

/* FETCH ONE */

export function* fetchUserWatcher() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserHandler);
}

function* fetchUserHandler(action) {
  try {
    const { user } = yield call(fetchUser, action.id);
    yield put(fetchUserSuccess(user));
  } catch(err) {
    console.error('fetchUser err --> ', err);
  }
}

/* SEARCH USERS */

export function* searchUsersWatcher() {
  yield takeLatest(SEARCH_USERS_REQUEST, searchUsersHandler);
}

function* searchUsersHandler(action) {
  try {
    const response = yield call(searchUsersAjax, action.query);
    yield put(searchUsersSuccess(response.users));
  } catch (err) {
    console.log('searchUsers err --> ', err);
    yield put(searchUsersFailure(err));
  }
}

/* CREATE USER */

export function* addUserWatcher() {
  yield takeLatest(SIGN_UP_REQUEST, addUserHandler);
}

function* addUserHandler(action) {
  try {
    // can add 'HTTP_PENDING' action to start a loading spinner
    const response = yield call(addUserAjax, action.userData);
    yield call(setAuthToken, response.token);
    yield put(signUpSuccess(response.user));
    yield put({ type: "TOKEN_AUTH" });
  } catch (err) {
    console.log('Err --> ', err);
    yield put(signUpFailure(err));
  }
}

/* UPDATE USER */

export function* updateUserWatcher() {
  yield takeLatest(UPDATE_USER_REQUEST, updateUserHandler);
}

function* updateUserHandler(action) {
  try {
    const response = yield call(updateUserAjax, action.userData);
    yield put(updateUserSuccess(response.user));
  } catch (err) {
    console.log('Err --> ', err);
    yield put(updateUserFailure(err));
  } 
}

/* DELETE USER */ 

export function* deleteUserWatcher() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUserHandler);
}

function* deleteUserHandler(action) {
  try {
    const response = yield call(deleteUserAjax, action.id);
    yield put(deleteUserSuccess(response.userId));
  } catch (err) {
    console.log('Err --> ', err);
    yield put(deleteUserFailure(err));
  }
}

export default [
  fork(fetchUserWatcher), 
  fork(addUserWatcher),
  fork(searchUsersWatcher),
  fork(updateUserWatcher),
  fork(deleteUserWatcher),
];

