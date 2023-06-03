
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
    let { profileData, formData } = action.data;
    
    // guard against invalid args
    if(!formData.has('avatar')) {
      throw new Error('no avatar selected!');
    }

    // create Profile only if not exists
    if(!profileData._id) {
      const { profile } = yield call(createProfile, {
        imageableId: profileData.imageableId,
        imageableType: profileData.imageableType
      });
      console.log('profile --> ', profile);
      profileData._id = profile._id;
      yield put(createProfileSuccess(profile));
    }

    // now upload Picture that goes with Profile
    formData.append('parentId', profileData._id);
    formData.append('parentType', 'Profile');
    yield put(uploadRequest(formData));
  } catch(err) {
    console.log('createProfile err --> ', err);
  }
}

/* EXPORTS */

export default [
  fork(createProfileWatcher), 
  fork(fetchProfileWatcher), 
]
