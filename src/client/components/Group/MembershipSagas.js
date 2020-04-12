
import { 
  CREATE_MEMBERSHIP, createMembershipSuccess, 
  DELETE_MEMBERSHIP, deleteMembershipSuccess, 
  SEARCH_MEMBERSHIPS_REQUEST, 
  FETCH_MEMBERSHIP_REQUEST,
  fetchMembershipSuccess, fetchMembershipFailure, 
  searchMembershipsSuccess, searchMembershipsFailure,
} from './MembershipActions';

import axios from '../../util/axiosCaller';
import { takeLatest, put, call, fork, select } from 'redux-saga/effects';


/* SEARCH MEMBERSHIPS */

const searchMembershipsAjax = (query) => {
  return axios.get('/api/memberships', { 
    params: query,  
  })
    .then(res => res.data)
    .catch(err => { throw err; })
}

export function* searchMembershipsWatcher() {
  yield takeLatest(SEARCH_MEMBERSHIPS_REQUEST, searchMembershipsHandler);
}

function* searchMembershipsHandler(action) {
  try {
    const response = yield call(searchMembershipsAjax, action.query);
    yield put(searchMembershipsSuccess(response.memberships));
  } catch(error) {
    yield put(searchMembershipsFailure(error));
  }
}

/* FETCH MEMBERSHIP */

const fetchMembershipAjax = (query) => {
  return axios.get(`/api/memberships/lookup`, { 
    params: query
   })
    .then(res => res.data)
    .catch(err => { throw err; })
}

export function* fetchMembershipWatcher() {
  yield takeLatest(FETCH_MEMBERSHIP_REQUEST, fetchMembershipHandler);
}

export function* fetchMembershipHandler(action) {
  try {
    const res = yield call(fetchMembershipAjax, action.query);
    console.log('fetchMembership success --> ', res);
    yield put(fetchMembershipSuccess(res.membership));
  } catch(err) {
    console.log('fetchMembership err --> ', err);
    yield put(fetchMembershipFailure(err));
  }
}

/* CREATE MEMBERSHIP */

const createMembershipAjax = (groupId, userId) => {
  return axios.post(`/api/memberships`, { groupId, userId, })
    .then(res => res.data)
    .catch(err => { throw err; })
}

export function* createMembershipWatcher() {
  yield takeLatest(CREATE_MEMBERSHIP, createMembershipHandler);
}

function* createMembershipHandler(action) {
  try {
    const res = yield call(createMembershipAjax, action.payload.groupId, action.payload.userId);
    console.log('createMembership res --> ', res);
    yield put(createMembershipSuccess(res.membership));
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
    const res = yield call(deleteMembershipAjax, action.id);
    yield put(deleteMembershipSuccess(action.id));
  } catch(error) {
    console.error('deleteMembership err --> ', err);
    //yield put(fetchGroupError(error));
  }
}

/* exports */

export default [
  fork(createMembershipWatcher), 
  fork(deleteMembershipWatcher),
  fork(searchMembershipsWatcher),
  fork(fetchMembershipWatcher),  
]


