
import { 
  UPLOAD_REQUEST, uploadSuccess, uploadFailure,  
} from './UploadActions';

import axios from '../../util/axiosCaller';

import { takeLatest, call, put, fork } from 'redux-saga/effects';

/* UPLOAD IMAGE */

const upload = (data) => {
  return axios.post('/api/pictures/', data, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    }
  })
    .then(res => res.data)
    .catch(err => { throw err; })
}

export function* uploadImageWatcher() {
  yield takeLatest(UPLOAD_REQUEST, uploadImageHandler);
}

export function* uploadImageHandler(action) {
  try {
    const res = yield call(upload, action.data);
    console.log('uploadImage res --> ', res);
    yield put(uploadSuccess());
  } catch(err) {
    console.log('uploadImage err --> ', err);
    yield put(uploadFailure(err))
  }
}

/* EXPORTS */

export default [
  fork(uploadImageWatcher), 
]



/* OLD

//import { UPLOAD_ALBUM_REQUEST, UPLOAD_PROFILE_REQUEST, } from './UploadActions';

// only uploads the image (does not interact with database)
export const uploadImage = (formData) => {
  return axios.post('/api/pictures/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => res.data)
    .catch(err => { throw err; })
}

// uploads image + updates profile field on db resource (e.g. Group/User/etc)
export const uploadProfile = (formData) => {
  return axios.post('/api/pictures/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => res.data)
    .catch(err => { throw err; })
}

// uploads image + updates album db entry
export const uploadAlbum = (formData) => {
  return axios.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => res.data)
    .catch(err => { throw err; })
}


export function* uploadProfileWatcher() {
  yield takeLatest(UPLOAD_PROFILE_REQUEST, uploadProfileHandler);
}

function* uploadProfileHandler(action) {
  try {
    

    const response = yield call(uploadProfile, action.formData);
    console.log('uploadProfile res --> ', response);
    yield put(uploadSuccess());
  } catch(error) {
    yield put(uploadFailure(error));
  }
}

export function* uploadAlbumWatcher() {
  yield takeLatest(UPLOAD_ALBUM_REQUEST, uploadAlbumHandler);
}

function* uploadAlbumHandler(action) {
  try {
    const response = yield call(uploadAlbum, action.formData);
    console.log('uploadAlbum res --> ', response);
    yield put(uploadSuccess());
  } catch(error) {
    yield put(uploadFailure(error));
  }
}

*/
