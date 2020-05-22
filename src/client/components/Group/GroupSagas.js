
import { 
  FETCH_GROUP_REQUEST, 
  CREATE_GROUP_REQUEST, 
  SEARCH_GROUPS_REQUEST, 
  DELETE_GROUP_REQUEST, 
  UPDATE_GROUP_REQUEST, 
} from './GroupActions';

import { 
  fetchGroupSuccess, fetchGroupError, 
  searchGroupsSuccess, searchGroupsError,
  createGroupSuccess, createGroupError,
  updateGroupSuccess, updateGroupError,
  deleteGroupSuccess, deleteGroupFailure,
} from './GroupActions';

import { createMembership } from './MembershipActions';
import { createAlbumRequest } from '../Album/AlbumActions';

import axios from '../../util/axiosCaller';
import { takeLatest, put, call, fork, select } from 'redux-saga/effects';

import { getGroups } from './GroupReducer';


                              /* FETCH ONE */

const fetchGroupAjax = (id) => {
  return axios.get(`/api/groups/${id}`)
    .then(res => res.data)
    .catch(err => { throw err; })
}  

export function* fetchGroupWatcher() {
  yield takeLatest(FETCH_GROUP_REQUEST, fetchGroupHandler);
}

function* fetchGroupHandler(action) {
  try {
    const response = yield call(fetchGroupAjax, action.id);
    let { group } = response;
    console.log('fetchGroupSaga --> ', group);
    yield put(fetchGroupSuccess(group));
  } catch(error) {
    yield put(fetchGroupError(error));
  }
}


                            /* SEARCHING */

const searchGroupsAjax = (query={}) => {
  console.log('fetchGroup query --> ', query);
  return axios.get('/api/groups/', { params: query })
    .then(res => res.data)
    .catch(err => { throw err; })
}

export function* searchGroupsWatcher() {
  yield takeLatest(SEARCH_GROUPS_REQUEST, searchGroupsHandler);
}

function* searchGroupsHandler(action) {
  try {
    // check reduxStore
    //const reduxGroups = yield select(getGroups);
    //console.log('reduxGroups --> ', reduxGroups);
  
    // check localStorage if reduxStore is empty and localStorage cache is fresh


    // call API to retrieve immediate results
    const response = yield call(searchGroupsAjax, action.query);
    let { groups, count } = response;
    console.log('searchGroups res --> ', response);
    yield put(searchGroupsSuccess(groups, count));

    // save results to localStorage


    // prefetch additional results


  } catch(error) {
    yield put(searchGroupsError(error));
  }
}

                              /* CREATING */

const createGroupAjax = (data) => {
  return axios.post('/api/groups/', data, {})
  .then(res => res.data)
  .catch(err => { throw err; })
}

export function* createGroupWatcher() {
  yield takeLatest(CREATE_GROUP_REQUEST, createGroupHandler);
}

function* createGroupHandler(action) {
  try {
    // create Group
    const { group } = yield call(createGroupAjax, action.data); 
    console.log('createGroupRes --> ', group);
    yield put(createGroupSuccess(group));

    // create Membership for admin User
    yield put(createMembership(group._id, action.data.admin, true));

    // create ALBUM/PROFILE
    yield put(createAlbumRequest({
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

const updateGroupAjax = (data) => {
  return axios.put(`/api/groups/${data._id}`, data, {})
  .then(res => res.data)
  .catch(err => { throw err; })
}

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

const deleteGroupAjax = (groupId) => {
  return axios.delete(`api/groups/${groupId}`)
  .then(res => res.data)
  .catch(err => { throw err; })
}

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


                            /* EXPORTS */

export default [
  fork(fetchGroupWatcher), 
  fork(searchGroupsWatcher),
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