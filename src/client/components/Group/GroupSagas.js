
import { 
  FETCH_GROUP_REQUEST, 
  CREATE_GROUP_REQUEST, 
  FETCH_GROUPS_REQUEST, 
  DELETE_GROUP_REQUEST, 
  UPDATE_GROUP_REQUEST, 
} from './GroupActions';

import { 
  fetchGroupSuccess, fetchGroupError, 
  fetchGroupsSuccess, fetchGroupsError,
  createGroupSuccess, createGroupError,
  updateGroupSuccess, updateGroupError,
  deleteGroupSuccess, deleteGroupFailure,
} from './GroupActions';

import { createAlbum } from '../Album/AlbumActions';

import axios from '../../util/axiosCaller';
import { takeLatest, put, call, fork, select } from 'redux-saga/effects';

import { getGroups } from './GroupReducer';



/* API CALLS */

const fetchGroupAjax = (id) => {
  return axios.get(`/api/groups/${id}`)
    .then(res => res.data)
    .catch(err => { throw err; })
}  

const fetchGroupsAjax = (query={}) => {
  console.log('fetchGroup query --> ', query);
  return axios.get('/api/groups/', { params: query })
    .then(res => res.data)
    .catch(err => { throw err; })
}

const createGroupAjax = (data) => {
  return axios.post('/api/groups/', data, {})
  .then(res => res.data)
  .catch(err => { throw err; })
}

const updateGroupAjax = (data) => {
  return axios.put(`/api/groups/${data._id}`, data, {})
  .then(res => res.data)
  .catch(err => { throw err; })
}

const deleteGroupAjax = (groupId) => {
  return axios.delete(`api/groups/${groupId}`)
  .then(res => res.data)
  .catch(err => { throw err; })
}

/* FETCH ONE */

export function* fetchGroupWatcher() {
  yield takeLatest(FETCH_GROUP_REQUEST, fetchGroupHandler);
}

function* fetchGroupHandler(action) {
  try {
    const response = yield call(fetchGroupAjax, action.id);
    let { group } = response;
    yield put(fetchGroupSuccess(group));
  } catch(error) {
    yield put(fetchGroupError(error));
  }
}


/* FETCHING */

export function* fetchGroupsWatcher() {
  yield takeLatest(FETCH_GROUPS_REQUEST, fetchGroupsHandler);
}

function* fetchGroupsHandler(action) {
  try {
    // check reduxStore
    const reduxGroups = yield select(getGroups);
    console.log(reduxGroups);
  
    // check localStorage if reduxStore is empty and localStorage cache is fresh


    // call API to retrieve immediate results
    const response = yield call(fetchGroupsAjax, action.query);
    let { groups, count } = response;
    yield put(fetchGroupsSuccess(groups, count));

    // save results to localStorage


    // prefetch additional results


  } catch(error) {
    yield put(fetchGroupsError(error));
  }
}

/* CREATING */

export function* createGroupWatcher() {
  yield takeLatest(CREATE_GROUP_REQUEST, createGroupHandler);
}

function* createGroupHandler(action) {
  try {
    const response = yield call(createGroupAjax, action.data);
    const group = response.group; 
    console.log('createGroupRes --> ', group);
    yield put(createGroupSuccess(group));
    yield put(createAlbum({
      name: 'Display Pictures', 
      authorId: group.admins[0],
      imageableId: group._id,
      imageableType: 'Group',
    }));
    yield put({type: 'NEW_ALERT', alert: { type: 'success', message: `Group - '${group.name}' was successfully created!` }});
    //yield put({type: 'CLOSE_MODAL'});
  } catch(error) {
    yield put(createGroupError(error));
  }
}

/* UPDATING */

export function* updateGroupWatcher() {
  yield takeLatest(UPDATE_GROUP_REQUEST, updateGroupHandler);
}

function* updateGroupHandler(action) {
  try {
    const response = yield call(updateGroupAjax, action.data);
    yield put(updateGroupSuccess(response.group));
  } catch(error) {
    yield put(updateGroupError(error));
  }
}

/* DELETING */

export function* deleteGroupWatcher() {
  yield takeLatest(DELETE_GROUP_REQUEST, deleteGroupHandler);
}

function* deleteGroupHandler(action) {
  try {
    const response = yield call(deleteGroupAjax, action.id);
    yield put(deleteGroupSuccess(response.groupId));
  } catch (err) {
    console.log('Err --> ', err);
    yield put(deleteGroupFailure(err));
  }
}


/* export Watchers */

export default [
  fork(fetchGroupWatcher), 
  fork(fetchGroupsWatcher),
  fork(createGroupWatcher),
  fork(updateGroupWatcher),
  fork(deleteGroupWatcher),
]





/*
import { CREATE_GROUP, CREATE_GROUP_REQUEST, CREATE_GROUP_SUCCESS, CREATE_GROUP_ERROR, 
  FETCH_GROUPS, FETCH_GROUPS_REQUEST, FETCH_GROUPS_SUCCESS, FETCH_GROUPS_ERROR,
  DELETE_GROUPS, DELETE_GROUPS_REQUEST, DELETE_GROUPS_SUCCESS, DELETE_GROUPS_ERROR, fetchGroups 
} from './GroupActions';

*/