import { CREATE_EVENT_REQUEST, GET_EVENT_REQUEST, FETCH_EVENTS_REQUEST, UPDATE_EVENT_REQUEST, DELETE_EVENT_REQUEST, } from './EventActions';

import {
  createEventSuccess, createEventFailure,
  getEventSuccess, getEventFailure, 
  fetchEventsSuccess, fetchEventsFailure,
  updateEventSuccess, updateEventFailure,
  deleteEventSuccess, deleteEventFailure,
} from './EventActions';

import axios from '../../util/axiosCaller';
import { takeLatest, put, call, fork } from 'redux-saga/effects';

/* AJAX REQUESTS */

const getEventAjax = (eventId) => {
  return axios.get(`api/events/${eventId}`)
  .then(res => res.data)
  .catch((err) => { throw err; })
}

const fetchEventsAjax = (query) => {
  return axios.get('api/events/', { params: query })
  .then(res => res.data)
  .catch((err) => { throw err; })
}

const createEventAjax = (event) => {
  return axios.post('api/events/', event)
  .then(res => res.data )
  .catch(err => { throw err; })
}

const updateEventAjax = (id, data) => {
  return axios.put(`api/events/${id}`, data)
  .then(res => res.data)
  .catch(err => { throw err; })
}

const deleteEventAjax = (eventId) => {
  return axios.delete(`api/events/${eventId}`)
  .then(res => res.data)
  .catch(err => { throw err; })
}

/* GET ONE EVENT */

export function* getEventWatcher() {
  yield takeLatest(GET_EVENT_REQUEST, getEventHandler);
}

function* getEventHandler(action) {
  try {
    const response = yield call(getEventAjax, action.id);
    yield put(getEventSuccess(response.event));
  } catch (err) {
    yield put(getEventFailure(err));
  }
}

/* SEARCH EVENTS */

export function* fetchEventsWatcher() {
  yield takeLatest(FETCH_EVENTS_REQUEST, fetchEventsHandler);
}

function* fetchEventsHandler(action) {
  try {
    const response = yield call(fetchEventsAjax, action.query);
    yield put(fetchEventsSuccess(response.events, response.count));
  } catch (err) {
    console.log('searchEvents err --> ', err);
    yield put(fetchEventsFailure(err));
  }
}

/* CREATE EVENT */

export function* createEventWatcher() {
  yield takeLatest(CREATE_EVENT_REQUEST, createEventHandler);
}

function* createEventHandler(action) {
  try {
    const response = yield call(createEventAjax, action.eventData);
    yield put(createEventSuccess(response.event));
  } catch (err) {
    console.log('createEvent err --> ', err);
    yield put(createEventFailure(err));
  }
}

/* UPDATE EVENT */

export function* updateEventWatcher() {
  yield takeLatest(UPDATE_EVENT_REQUEST, updateEventHandler);
}

function* updateEventHandler(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateEventAjax, id, data);
    yield put(updateEventSuccess(response.event));
  } catch (err) {
    console.log('updateEvent err --> ', err);
    yield put(updateEventFailure(err));
  } 
}

/* DELETE EVENT */ 

export function* deleteEventWatcher() {
  yield takeLatest(DELETE_EVENT_REQUEST, deleteEventHandler);
}

function* deleteEventHandler(action) {
  try {
    const response = yield call(deleteEventAjax, action.id);
    yield put(deleteEventSuccess(response.eventId));
  } catch (err) {
    console.log('deleteEvent err --> ', err);
    yield put(deleteEventFailure(err));
  }
}

export default [
  fork(createEventWatcher),
  fork(getEventWatcher),
  fork(fetchEventsWatcher),
  fork(updateEventWatcher),
  fork(deleteEventWatcher),
];

