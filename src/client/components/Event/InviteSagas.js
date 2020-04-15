
import { takeLatest, call, put, fork, } from 'redux-saga/effects';

import axios from '../../util/axiosCaller';

import {
  SEARCH_INVITE_REQUEST, searchInviteSuccess, 
  CREATE_INVITE_REQUEST, createInviteSuccess,
  DELETE_INVITE_REQUEST, deleteInviteSuccess,
  UPDATE_INVITE_REQUEST, updateInviteSuccess, UPDATE_INVITE_SUCCESS, 
} from './InviteActions';

/* SEARCH */

function searchInvite(query) {
  return axios.get('/api/invites/', {
    params: query, 
  })
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* searchInviteWatcher() {
  yield takeLatest(SEARCH_INVITE_REQUEST, searchInviteHandler);
}

function* searchInviteHandler(action) {
  try {
    const res = yield call(searchInvite, action.query);
    console.log('searchInvites res --> ', res);
    yield put(searchInviteSuccess(res.invites));
  } catch(err) {
    console.error('searchInvites err --> ', err);
  }
}

/* CREATE */

function createInvite(data) {
  return axios.post('/api/invites/', data)
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* createInviteWatcher() {
  yield takeLatest(CREATE_INVITE_REQUEST, createInviteHandler);
}

function* createInviteHandler(action) {
  try {
    const res = yield call(createInvite, action.data);
    console.log('createInvite res --> ', res);
  } catch(err) {
    console.error('createInvite err --> ', err);
  }
}

/* DELETE */

function deleteInvite(id) {
  return axios.delete(`/api/invites/${id}`)
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* deleteInviteWatcher() {
  yield takeLatest(DELETE_INVITE_REQUEST, deleteInviteHandler);
}

function* deleteInviteHandler(action) {
  try {
    const res = yield call(deleteInvite, action.id);
    console.log('deleteInvite res --> ', res);
  } catch(err) {
    console.error('deleteInvite err --> ', err);
  }
}

/* UPDATE */

function updateInvite(data, id) {
  return axios.put(`/api/invites/${id}`, data)
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* updateInviteWatcher() {
  yield takeLatest(UPDATE_INVITE_REQUEST, updateInviteHandler);
}

function* updateInviteHandler(action) {
  try {
    const res = yield call(updateInvite, action.data);
    console.log('updateInvite res --> ', res);
  } catch(err) {
    console.error('updateInvite err --> ', err);
  }
}

/* EXPORTS */

export default [
  fork(searchInviteWatcher), 
  fork(createInviteWatcher),
  fork(deleteInviteWatcher),
  fork(updateInviteWatcher), 
]
