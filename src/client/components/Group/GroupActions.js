
export const FETCH_GROUP_REQUEST = 'FETCH_GROUP_REQUEST';
export const FETCH_GROUP_SUCCESS = 'FETCH_GROUP_SUCCESS';
export const FETCH_GROUP_ERROR = 'FETCH_GROUP_ERROR';

export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_ERROR = 'CREATE_GROUP_ERROR';

export const SEARCH_GROUPS_REQUEST = 'SEARCH_GROUPS_REQUEST';
export const SEARCH_GROUPS_SUCCESS = 'SEARCH_GROUPS_SUCCESS';
export const SEARCH_GROUPS_ERROR = 'SEARCH_GROUPS_ERROR';

export const DELETE_GROUP_REQUEST = 'DELETE_GROUP_REQUEST';
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_ERROR = 'DELETE_GROUP_ERROR';

export const UPDATE_GROUP_REQUEST = 'UPDATE_GROUP_REQUEST';
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS';
export const UPDATE_GROUP_ERROR = 'UPDATE_GROUP_ERROR';

/* FETCH ONE */

export function fetchGroup(id) {
  return {
    type: FETCH_GROUP_REQUEST,
    id,
  }
}

export function fetchGroupSuccess(group) {
  return {
    type: FETCH_GROUP_SUCCESS,
    group,
  }
}

export function fetchGroupError(errors) {
  return {
    type: FETCH_GROUP_ERROR,
    errors, 
  }
}


/* SEARCHING */

export function searchGroups(query={}) {
  return {
    type: SEARCH_GROUPS_REQUEST,
    query
  };
}

export function searchGroupsSuccess(groups, count) {
  return {
    type: SEARCH_GROUPS_SUCCESS,
    payload: {
      groups,
      count
    }
  }
}

export function searchGroupsError(errors) {
  return {
    type: SEARCH_GROUPS_ERROR,
    errors
  }
}

/* CREATION */

export function createGroup(data) {
  return {
    type: CREATE_GROUP_REQUEST,
    data
  };
}

export function createGroupSuccess(group) {
  return {
    type: CREATE_GROUP_SUCCESS,
    group
  }
}

export function createGroupError(errors) {
  return {
    type: CREATE_GROUP_ERROR,
    errors
  }
}

/* UPDATING */

export function updateGroup(data) {
  return {
    type: UPDATE_GROUP_REQUEST,
    data,
  };
}

export function updateGroupSuccess(group) {
  return {
    type: UPDATE_GROUP_SUCCESS,
    group
  }
}

export function updateGroupError(errors) {
  return {
    type: UPDATE_GROUP_ERROR,
    errors
  }
}

/* DELETING */

export function deleteGroupRequest(id) {
  return {
    type: DELETE_GROUP_REQUEST,
    id,
  };
}

export function deleteGroupSuccess(id) {
  return {
    type: DELETE_GROUP_SUCCESS,
    id,
  };
}

export function deleteGroupFailure(errors) {
  return {
    type: DELETE_GROUP_FAILURE,
    errors,
  };
}


