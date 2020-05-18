
import {
  GEOCODING_REQUEST, AUTOCOMPLETE_REQUEST, 
  geocodeSuccess, autocompleteSuccess, 
} from './GeolocationActions';

import { takeLatest, fork, call, put, } from 'redux-saga/effects';

import axios from '../../../util/axiosCaller';

/* Geocoding */

function geocode(data) {


  return axios.get()
}

function* geocodeWatcher() {
  yield takeLatest(GEOCODING_REQUEST, geocodeHandler);
}

function* geocodeHandler(action) {
  try {
    const res = yield call(geocode, action.queryString);
    console.log('geocode res --> ', res);
  } catch(err) {
    console.error('geocode err --> ', err);
  }
}


/* Autocomplete */

// WORKING (more or less)
function autocomplete(query) {
  console.log('autocomplete query --> ', query);

  // const query = 'https://nominatim.openstreetmap.org/search?q=etobicoke&format=json';
  // const query = 'https://nominatim.openstreetmap.org/search?q=36+holywell+drive&format=json';

  const template = `https://nominatim.openstreetmap.org/search?q=${query.location}&format=json`;

  return axios.get(template)
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* autocompleteWatcher() {
  yield takeLatest(AUTOCOMPLETE_REQUEST, autocompleteHandler);
}

function* autocompleteHandler(action) {
  try {
    const res = yield call(autocomplete, action.query);
    console.log('autocomplete res --> ', res);
    yield put(autocompleteSuccess(res));
  } catch(err) {
    console.error('autocomplete err --> ', err);
  }
}

/* EXPORTS */

export default [
  fork(autocompleteWatcher),
  fork(geocodeWatcher), 
]

