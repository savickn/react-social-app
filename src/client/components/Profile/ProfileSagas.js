
import { put, call, takeLatest, fork, } from 'redux-saga/effects';
import axios from '../../util/axiosCaller';

import { 
  CREATE_PROFILE_REQUEST, FETCH_PROFILE_REQUEST, 
  createProfileSuccess, fetchProfileSuccess, 
} from './ProfileActions';

import { uploadRequest, } from '../Upload/UploadActions';

/* FETCH PROFILE */

function fetchProfile(id) {
  return axios.get(`/api/profiles/${id}`)
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* fetchProfileWatcher() {
  yield takeLatest(FETCH_PROFILE_REQUEST, fetchProfileHandler);
}

function* fetchProfileHandler(action) {
  try {
    const res = yield call(fetchProfile, action.id);
    console.log('fetchProfile res --> ', res);
    yield put(fetchProfileSuccess(res.profile));
  } catch(err) {
    console.log('fetchProfile err --> ', err);
  }
}

/* CREATE PROFILE */

function createProfile(data) {
  return axios.post('/api/profiles/', data)
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* createProfileWatcher() {
  yield takeLatest(CREATE_PROFILE_REQUEST, createProfileHandler);
}

function* createProfileHandler(action) {
  try {
    // create Profile
    const { profile } = yield call(createProfile, action.data);
    yield put(createProfileSuccess(profile));

    // now upload Picture that goes with Profile


  } catch(err) {
    console.log('createProfile err --> ', err);
  }
}

/* EXPORTS */

export default [
  fork(createProfileWatcher), 
  fork(fetchProfileWatcher), 
]
