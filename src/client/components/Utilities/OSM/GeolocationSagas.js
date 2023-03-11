
import {
  GEOCODING_REQUEST, AUTOCOMPLETE_REQUEST, REVERSE_REQUEST, 
  geocodeSuccess, autocompleteSuccess, reverseSuccess, 
} from './GeolocationActions';

import { takeLatest, fork, call, put, } from 'redux-saga/effects';

import axios from '../../../util/axiosCaller';

/* Reverse Geocoding */

// turns coords into location
function reverseGeocode(coords) {
  const templateStr = `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lon}&format=geojson`;
  //console.log(templateStr);
  return axios.get(templateStr)
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* reverseWatcher() {
  yield takeLatest(REVERSE_REQUEST, reverseHandler);
}

function* reverseHandler(action) {
  try {
    const res = yield call(reverseGeocode, action.coords);
    //console.log('reverse res --> ', res);

    localStorage.setItem('currentLocation', JSON.stringify(res.features[0]));
    yield put(reverseSuccess(res.features[0]));
  } catch(err) {
    console.error('geocode err --> ', err);
  }
}

/* Autocomplete */

// WORKING (more or less)
// suggestions based on user input string
function autocomplete(query) {
  const restrictions = query.country_code ? `&countrycodes=${query.country_code}` : '';

  const templateStr = `https://nominatim.openstreetmap.org/search?q=${query.location}${restrictions}&format=json&addressdetails=1`;

  //console.log('autocompleteStr --> ', templateStr);

  return axios.get(templateStr)
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


/* GEOCODING */

// turns location into coords
function geocode(data) {
  const templateStr = `https://nominatim.openstreetmap.org/search?q=${query.location}&format=json`;

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

/* EXPORTS */

export default [
  fork(autocompleteWatcher),
  fork(geocodeWatcher), 
  fork(reverseWatcher), 
]

