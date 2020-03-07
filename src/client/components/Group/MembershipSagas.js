
import { 
  CREATE_MEMBERSHIP,
  DELETE_MEMBERSHIP, 
  FETCH_MEMBERSHIPS_REQUEST, FETCH_MEMBERSHIPS_SUCCESS, FETCH_MEMBERSHIPS_FAILURE, fetchMembershipsFailure, 
} from './MembershipActions';


import axios from '../../util/axiosCaller';
import { takeLatest, put, call, fork, select } from 'redux-saga/effects';


/* API CALLS */

const createMembershipAjax = (groupId, userId) => {
  return axios.post(`/api/memberships`, { groupId, userId })
    .then(res => res.data)
    .catch(err => { throw err; })
}

const deleteMembershipAjax = (id) => {
  return axios.delete(`/api/memberships/${id}`)
    .then(res => res.data)
    .catch(err => { throw err; })
} 

const fetchMembershipsAjax = (query) => {
  return axios.get('/api/memberships', { query })
    .then(res => res.data)
    .catch(err => { throw err; })
}

/* FETCH MEMBERSHIPS */

export function* fetchMembershipsWatcher() {
  yield takeLatest(FETCH_MEMBERSHIPS_REQUEST, fetchMembershipsHandler);
}

function* fetchMembershipsHandler(action) {
  try {
    const response = yield call(fetchMembershipsAjax, action.query);
    yield put(fetchMembershipsSuccess(response.memberships));
  } catch(error) {
    yield put(fetchMembershipsFailure(error));
  }
}

/* CREATE MEMBERSHIP */

export function* createMembershipWatcher() {
  yield takeLatest(CREATE_MEMBERSHIP, createMembershipHandler);
}

function* createMembershipHandler(action) {
  try {
    const response = yield call(createMembershipAjax, action.payload.groupId, action.payload.userId);
    //yield put(fetchGroupSuccess(group));
  } catch(error) {
    //yield put(fetchGroupError(error));
  }
}

/* DELETE MEMBERSHIP */

export function* deleteMembershipWatcher() {
  yield takeLatest(DELETE_MEMBERSHIP, deleteMembershipHandler);
}

function* deleteMembershipHandler(action) {
  try {
    const response = yield call(deleteMembershipAjax, action.id);
    //yield put(fetchGroupSuccess(group));
  } catch(error) {
    //yield put(fetchGroupError(error));
  }
}

/* export Watchers */

export default [
  fork(createMembershipWatcher), 
  fork(deleteMembershipWatcher),
]


