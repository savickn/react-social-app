
import { 
  CREATE_ALBUM_REQUEST, 
  FETCH_ALBUMS_REQUEST, 
  DELETE_ALBUM_REQUEST, 
  UPDATE_ALBUM_REQUEST, 
} from './AlbumActions';

import { 
  fetchAlbumsSuccess, fetchAlbumsError,
  createAlbumSuccess, createAlbumError,
  updateAlbumSuccess, updateAlbumError,
  deleteAlbumSuccess, deleteAlbumFailure,
} from './AlbumActions';

import axios from '../../util/axiosCaller';
import { takeLatest, put, call, fork, select } from 'redux-saga/effects';

import { getAlbums } from './AlbumReducer';


/* API CALLS */

const fetchAlbumsAjax = (query={}) => {
  console.log('fetchAlbum query --> ', query);
  return axios.get('/api/albums/', { params: query })
  .then(res => res.data)
  .catch(err => { throw err; })
}

const createAlbumAjax = (data) => {
  return axios.post('/api/albums/', data, {})
  .then(res => res.data)
  .catch(err => { throw err; })
}

const updateAlbumAjax = (data) => {
  return axios.put(`/api/albums/${data._id}`, data, {})
  .then(res => res.data)
  .catch(err => { throw err; })
}

const deleteAlbumAjax = (albumId) => {
  return axios.delete(`api/albums/${albumId}`)
  .then(res => res.data)
  .catch(err => { throw err; })
}

/* FETCHING */

export function* fetchAlbumsWatcher() {
  yield takeLatest(FETCH_ALBUMS_REQUEST, fetchAlbumsHandler);
}

function* fetchAlbumsHandler(action) {
  try {
    // check reduxStore
    const reduxAlbums = yield select(getAlbums);
    console.log(reduxAlbums);
  
    // check localStorage if reduxStore is empty and localStorage cache is fresh


    // call API to retrieve immediate results
    const response = yield call(fetchAlbumsAjax, action.query);
    let { albums, count } = response;
    yield put(fetchAlbumsSuccess(albums, count));

    // save results to localStorage


    // prefetch additional results


  } catch(error) {
    yield put(fetchAlbumsError(error));
  }
}

/* CREATING */

export function* createAlbumWatcher() {
  yield takeLatest(CREATE_ALBUM_REQUEST, createAlbumHandler);
}

function* createAlbumHandler(action) {
  try {
    const response = yield call(createAlbumAjax, action.data);
    yield put(createAlbumSuccess(response.album));
    //yield put({type: 'CLOSE_MODAL'});
  } catch(error) {
    yield put(createAlbumError(error));
  }
}

/* UPDATING */

export function* updateAlbumWatcher() {
  yield takeLatest(UPDATE_ALBUM_REQUEST, updateAlbumHandler);
}

function* updateAlbumHandler(action) {
  try {
    const response = yield call(updateAlbumAjax, action.data);
    yield put(updateAlbumSuccess(response.album));
  } catch(error) {
    yield put(updateAlbumError(error));
  }
}

/* DELETING */

export function* deleteAlbumWatcher() {
  yield takeLatest(DELETE_ALBUM_REQUEST, deleteAlbumHandler);
}

function* deleteAlbumHandler(action) {
  try {
    const response = yield call(deleteAlbumAjax, action.id);
    yield put(deleteAlbumSuccess(response.albumId));
  } catch (err) {
    console.log('Err --> ', err);
    yield put(deleteAlbumFailure(err));
  }
}


/* export Watchers */

export default [
  fork(fetchAlbumsWatcher),
  fork(createAlbumWatcher),
  fork(updateAlbumWatcher),
  fork(deleteAlbumWatcher),
]


