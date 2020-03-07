
import { 
  CREATE_INVITE,
  DELETE_INVITE, 
} from './InviteActions';


import axios from '../../util/axiosCaller';
import { takeLatest, put, call, fork, select } from 'redux-saga/effects';


/* API CALLS */

const createInviteAjax = (eventId, userId) => {
  return axios.post(`/api/invites`, { eventId, userId })
    .then(res => res.data)
    .catch(err => { throw err; })
}

const deleteInviteAjax = (id) => {
  return axios.delete(`/api/invites/${id}`)
    .then(res => res.data)
    .catch(err => { throw err; })
} 

/* CREATE INVITE */

export function* createInviteWatcher() {
  yield takeLatest(CREATE_INVITE, createInviteHandler);
}

function* createInviteHandler(action) {
  try {
    const response = yield call(createInviteAjax, action.payload.groupId, action.payload.userId);
    let { invite } = response;
    //yield put(fetchGroupSuccess(group));
  } catch(error) {
    //yield put(fetchGroupError(error));
  }
}

/* DELETE INVITE */

export function* deleteInviteWatcher() {
  yield takeLatest(DELETE_INVITE, deleteInviteHandler);
}

function* deleteInviteHandler(action) {
  try {
    const response = yield call(deleteInviteAjax, action.id);
    //yield put(fetchGroupSuccess(group));
  } catch(error) {
    //yield put(fetchGroupError(error));
  }
}

/* export Watchers */

export default [
  fork(createInviteWatcher), 
  fork(deleteInviteWatcher),
]


