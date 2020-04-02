
/* GENERIC/SYNCHRONOUS ACTIONS */

export const CLEAR_COLLECTION = 'CLEAR_COLLECTION';

/* AJAX ACTIONS */

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const GET_EVENT_REQUEST = 'GET_EVENT_REQUEST';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILURE = 'GET_EVENT_FAILURE';

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

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

/* SIGN UP / ACCOUNT CREATION */

export function createEventRequest(eventData) {
  return {
    type: CREATE_EVENT_REQUEST,
    eventData,
  };
}

export function createEventSuccess(event) {
  return {
    type: CREATE_EVENT_SUCCESS,
    event,
  };
}

export function createEventFailure(errors) {
  return {
    type: CREATE_EVENT_FAILURE,
    errors,
  };
}

/* GET EVENT */

export function getEventRequest(id) {
  return {
    type: GET_EVENT_REQUEST,
    id,
  }
}

export function getEventSuccess(event) {
  return {
    type: GET_EVENT_SUCCESS,
    event,
  }
}

export function getEventFailure(errors) {
  return {
    type: GET_EVENT_FAILURE,
    errors,
  }
}

/* SEARCH EVENTS */

export function fetchEventsRequest(query) {
  return {
    type: FETCH_EVENTS_REQUEST,
    query,
  }
}

export function fetchEventsSuccess(events, count) {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: {
      events, 
      count, 
    }
  }
}

export function fetchEventsFailure(errors) {
  return {
    type: FETCH_EVENTS_FAILURE,
    errors,
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

export function updateEventFailure(errors) {
  return {
    type: UPDATE_EVENT_FAILURE,
    errors,
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

export function deleteEventFailure(errors) {
  return {
    type: DELETE_EVENT_FAILURE,
    errors,
  };
}



