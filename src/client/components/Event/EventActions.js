
/* GENERIC/SYNCHRONOUS ACTIONS */

export const CLEAR_COLLECTION = 'CLEAR_COLLECTION';
export const EVENT_ERROR = 'EVENT_ERROR';

/* AJAX ACTIONS */

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const FETCH_EVENT_REQUEST = 'FETCH_EVENT_REQUEST';
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';

export const SEARCH_EVENTS_REQUEST = 'SEARCH_EVENTS_REQUEST';
export const SEARCH_EVENTS_SUCCESS = 'SEARCH_EVENTS_SUCCESS';
export const SEARCH_EVENTS_FAILURE = 'SEARCH_EVENTS_FAILURE';
export const LOAD_MORE_EVENTS_SUCCESS = 'LOAD_MORE_EVENTS_SUCCESS';

export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE';

export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';


/* GENERIC CREATORS */

export function clearCollection() {
  return {
    type: CLEAR_COLLECTION, 
  }
}

export function eventError(errors) {
  return {
    type: EVENT_ERROR, 
    errors, 
  }
}

/* SIGN UP / ACCOUNT CREATION */

export function createEventRequest(data) {
  return {
    type: CREATE_EVENT_REQUEST,
    data,
  };
}

export function createEventSuccess(event) {
  return {
    type: CREATE_EVENT_SUCCESS,
    event,
  };
}

/* FETCH EVENT */

export function fetchEventRequest(id) {
  return {
    type: FETCH_EVENT_REQUEST,
    id
  }
}

export function fetchEventSuccess(event) {
  return {
    type: FETCH_EVENT_SUCCESS,
    event,
  }
}

/* SEARCH EVENTS */

export function searchEventsRequest(query, replace) {
  return {
    type: SEARCH_EVENTS_REQUEST,
    query,
    replace,
  }
}

export function searchEventsSuccess(events, count) {
  return {
    type: SEARCH_EVENTS_SUCCESS,
    payload: {
      events, 
      count, 
    }
  }
}

export function loadMoreEventsSuccess(events) {
  return {
    type: LOAD_MORE_EVENTS_SUCCESS,
    payload: {
      events, 
      count, 
    }
  }
}


/* UPDATE EVENT */

export function updateEventRequest(id, data) {
  return {
    type: UPDATE_EVENT_REQUEST,
    payload: {
      id,
      data, 
    }
  }
}

export function updateEventSuccess(event) {
  return {
    type: UPDATE_EVENT_SUCCESS,
    event,
  }
}

/* DELETE EVENT */

export function deleteEventRequest(id) {
  return {
    type: DELETE_EVENT_REQUEST,
    id,
  };
}

export function deleteEventSuccess(id) {
  return {
    type: DELETE_EVENT_SUCCESS,
    id,
  };
}



