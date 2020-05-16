
import { 
  CLEAR_COLLECTION, EVENT_ERROR, 
  CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, 
  FETCH_EVENT_REQUEST, FETCH_EVENT_SUCCESS, 
  SEARCH_EVENTS_REQUEST, SEARCH_EVENTS_SUCCESS, 
  UPDATE_EVENT_REQUEST, UPDATE_EVENT_SUCCESS, 
  DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, 
} from './EventActions';

import { updateByObjectId, removeByObjectId, mergeArrays } from '../../util/utilFuncs';

/* Status can be:
* idle -> no request
* pending -> processing request
* error -> Errors occurred
*/

const initialState = {
  status: 'idle',
  collection: [],
  len: 0, 
  errors: null
};

const EventReducer = (state = initialState, action) => {
  switch(action.type) {
    /* GENERIC ACTIONS */

    case CLEAR_COLLECTION:
      return {
        ...initialState, 
      };
    case EVENT_ERROR:
      return {
        ...state,
        errors: action.errors, 
      };

    /* CREATING EVENTS */

    case CREATE_EVENT_REQUEST:
      return {
        ...state, 
        status: 'pending',
        errors: null
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state, 
        status: 'idle',
        collection: [...state.collection, action.event],
      };

    /* GET SPECIFIC EVENT */

    case FETCH_EVENT_REQUEST:
      return {
        ...state, 
        status: 'pending',
        errors: null,
      };
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        status: 'idle',
        collection: mergeArrays(state.collection, [action.event]), 
      };

    /* SEARCH EVENTS */

    case SEARCH_EVENTS_REQUEST:
      return {
        ...state,
        status: 'pending',
      };
    case SEARCH_EVENTS_SUCCESS:
      return {
        status: 'idle',
        collection: mergeArrays(state.collection, action.payload.events),
        len: action.payload.count, 
        errors: null, 
      };

    /* UPDATING EVENTS */

    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        status: 'pending',
        errors: null
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state, 
        status: 'idle',
        collection: updateByObjectId(state.collection, action.event)
      };

    /* DELETING EVENTS */

    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        status: 'pending',
        errors: null
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        status: 'idle',
        collection: removeByObjectId(state.collection, action.id)
      };

    default:
      return state;
  }
}

export const getEventsByPage = (state, page=1, size=10) => {
  const startIdx = (page - 1) * size;
  const endIdx = startIdx + size;
  return state.events.collection.slice(startIdx, endIdx);
}

export const getEvents = (state) => state.events.collection;
export const getEventCount = (state) => state.events.len;
export const getEventStatus = (state) => state.events.status;
export const getEventErrors = (state) => state.events.errors;
export const getEventById = (state, id) => state.events.collection.filter((evt) => evt._id = id)[0];

export default EventReducer;
