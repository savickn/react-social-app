import { 
  CREATE_EVENT_REQUEST, 
  FETCH_EVENT_REQUEST, 
  SEARCH_EVENTS_REQUEST, 
  UPDATE_EVENT_REQUEST, 
  DELETE_EVENT_REQUEST, 
} from './EventActions';

import {
  createInviteRequest, 
} from '../Invite/InviteActions';

import {
  createEventSuccess,
  fetchEventSuccess, 
  searchEventsSuccess, 
  updateEventSuccess, 
  deleteEventSuccess, 
  eventError, 
} from './EventActions';

import axios from '../../util/axiosCaller';
import { takeLatest, put, call, fork } from 'redux-saga/effects';


                                                /* FETCH ONE EVENT */

const fetchEventAjax = (eventId) => {
  return axios.get(`api/events/${eventId}`)
  .then(res => res.data)
  .catch((err) => { throw err; })
}

export function* fetchEventWatcher() {
  yield takeLatest(FETCH_EVENT_REQUEST, fetchEventHandler);
}

function* fetchEventHandler(action) {
  try {
    const response = yield call(fetchEventAjax, action.id);
    yield put(fetchEventSuccess(response.event));
  } catch (err) {
    yield put(eventError(err));
  }
}

                                                /* SEARCH EVENTS */

const searchEventsAjax = (query) => {
  return axios.get('api/events/', { params: query })
  .then(res => res.data)
  .catch((err) => { throw err; })
}

export function* searchEventsWatcher() {
  yield takeLatest(SEARCH_EVENTS_REQUEST, searchEventsHandler);
}

function* searchEventsHandler(action) {
  try {
    const response = yield call(searchEventsAjax, action.query);
    yield put(searchEventsSuccess(response.events, response.count));
  } catch (err) {
    console.log('searchEvents err --> ', err);
    yield put(eventError(err));
  }
}

                                                  /* CREATE EVENT */

const createEventAjax = (event) => {
  return axios.post('api/events/', event)
  .then(res => res.data )
  .catch(err => { throw err; })
}

export function* createEventWatcher() {
  yield takeLatest(CREATE_EVENT_REQUEST, createEventHandler);
}

function* createEventHandler(action) {
  try {
    const { event } = yield call(createEventAjax, action.data);
    const initialInvite = {
      event: event._id, 
      user: event.creator, 
      issueType: 'Admin', 
      accepted: true,
      verified: true, 
      status: 'Attending'
    };
    event.invites.push(initialInvite) // for optimistic loading 
    yield put(createEventSuccess(event));
    
    // create an Invite for the Creator
    yield put(createInviteRequest(initialInvite));
  } catch (err) {
    console.log('createEvent err --> ', err);
    yield put(eventError(err));
  }
}

                                                  /* UPDATE EVENT */

const updateEventAjax = (id, data) => {
  return axios.put(`api/events/${id}`, data)
  .then(res => res.data)
  .catch(err => { throw err; })
}

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
    yield put(eventError(err));
  } 
}

                                                  /* DELETE EVENT */ 


const deleteEventAjax = (eventId) => {
  return axios.delete(`api/events/${eventId}`)
  .then(res => res.data)
  .catch(err => { throw err; })
}


export function* deleteEventWatcher() {
  yield takeLatest(DELETE_EVENT_REQUEST, deleteEventHandler);
}

function* deleteEventHandler(action) {
  try {
    const response = yield call(deleteEventAjax, action.id);
    yield put(deleteEventSuccess(response.eventId));
  } catch (err) {
    console.log('deleteEvent err --> ', err);
    yield put(eventError(err));
  }
}

export default [
  fork(createEventWatcher),
  fork(fetchEventWatcher),
  fork(searchEventsWatcher),
  fork(updateEventWatcher),
  fork(deleteEventWatcher),
];

