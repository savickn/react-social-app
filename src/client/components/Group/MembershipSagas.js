
import { 
  CREATE_MEMBERSHIP,
  DELETE_MEMBERSHIP, 
  FETCH_MEMBERSHIPS_REQUEST, FETCH_MEMBERSHIPS_SUCCESS, FETCH_MEMBERSHIPS_FAILURE, 
  FETCH_MEMBERSHIP_REQUEST, FETCH_MEMBERSHIP_SUCCESS, FETCH_MEMBERSHIP_FAILURE, 
  fetchMembershipSuccess, fetchMembershipFailure, 
  fetchMembershipsSuccess, fetchMembershipsFailure,
} from './MembershipActions';


import axios from '../../util/axiosCaller';
import { takeLatest, put, call, fork, select } from 'redux-saga/effects';


/* API CALLS */

const fetchMembershipAjax = (query) => {
  return axios.get(`/api/memberships/lookup`, { query })
    .then(res => res.data)
    .catch(err => { throw err; })
}

/* SEARCH MEMBERSHIPS */

const fetchMembershipsAjax = (query) => {
  return axios.get('/api/memberships', { 
    params: query,  
  })
    .then(res => res.data)
    .catch(err => { throw err; })
}

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

/* FETCH MEMBERSHIP */

export function* fetchMembershipWatcher() {
  yield takeLatest(FETCH_MEMBERSHIP_REQUEST, fetchMembershipHandler);
}

export function* fetchMembershipHandler(action) {
  try {
    const res = yield call(fetchMembership, action.query);
    console.log('fetchMembership success --> ', res);
    yield put(fetchMembershipsSuccess(res));
  } catch(err) {
    console.log('fetchMembership err --> ', err);
    yield put(fetchMembershipFailure(err));
  }
}

/* CREATE MEMBERSHIP */

const createMembershipAjax = (groupId, userId) => {
  return axios.post(`/api/memberships`, { groupId, userId })
    .then(res => res.data)
    .catch(err => { throw err; })
}

export function* createMembershipWatcher() {
  yield takeLatest(CREATE_MEMBERSHIP, createMembershipHandler);
}

function* createMembershipHandler(action) {
  try {
    const response = yield call(createMembershipAjax, action.payload.groupId, action.payload.userId);
    console.log('createMembership res --> ', res);
    //yield put(fetchGroupSuccess(group));
  } catch(error) {
    console.error('createMembership err --> ', error);
    //yield put(fetchGroupError(error));
  }
}

/* DELETE MEMBERSHIP */

const deleteMembershipAjax = (id) => {
  return axios.delete(`/api/memberships/${id}`)
    .then(res => res.data)
    .catch(err => { throw err; })
} 

export function* deleteMembershipWatcher() {
  yield takeLatest(DELETE_MEMBERSHIP, deleteMembershipHandler);
}

function* deleteMembershipHandler(action) {
  try {
    const response = yield call(deleteMembershipAjax, action.id);
    //yield put(fetchGroupSuccess(group));
  } catch(error) {
    console.error('deleteMembership err --> ', err);
    //yield put(fetchGroupError(error));
  }
}

/* exports */

export default [
  fork(createMembershipWatcher), 
  fork(deleteMembershipWatcher),
  fork(fetchMembershipsWatcher),
  fork(fetchMembershipWatcher),  
]


