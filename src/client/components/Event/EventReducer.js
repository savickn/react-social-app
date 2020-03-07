import { CLEAR_COLLECTION } from './EventActions';
import { 
  CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE,
  GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_FAILURE,
  FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE,
  UPDATE_EVENT_REQUEST, UPDATE_EVENT_SUCCESS, UPDATE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE,
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
    case CREATE_EVENT_FAILURE:
      return {
        ...state,
        status: 'error',
        errors: action.errors,
      };

    /* GET SPECIFIC EVENT */

    case GET_EVENT_REQUEST:
      return {
        ...state, 
        status: 'pending',
        errors: null,
      };

    case GET_EVENT_SUCCESS:
      return {
        ...state,
        status: 'idle',
        collection: mergeArrays(state.collection, [action.event]), 
      };

    case GET_EVENT_FAILURE:
      return {
        ...state,
        status: 'error',
        errors: action.errors
      };

    /* SEARCH EVENTS */

    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        status: 'pending',
        errors: null
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        status: 'idle',
        collection: mergeArrays(state.collection, action.payload.events),
        len: action.payload.count, 
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        status: 'error',
        errors: action.errors
      };

    /* UPDATING EVENTS */

    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        status: 'pending',
        errors: null
      }
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state, 
        status: 'idle',
        collection: updateByObjectId(state.collection, action.event)
      }
    case UPDATE_EVENT_FAILURE:
      return {
        ...state,
        status: 'error',
        errors: action.errors
      }
    
    /* DELETING EVENTS */

    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        status: 'pending',
        errors: null
      }
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        status: 'idle',
        collection: removeByObjectId(state.collection, action.id)
      }
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        status: 'error',
        errors: action.errors
      }

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
