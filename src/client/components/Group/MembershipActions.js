
export const CREATE_MEMBERSHIP = 'CREATE_MEMBERSHIP';
export const DELETE_MEMBERSHIP = 'DELETE_MEMBERSHIP';

export const FETCH_MEMBERSHIPS_REQUEST = 'FETCH_MEMBERSHIPS_REQUEST';
export const FETCH_MEMBERSHIPS_SUCCESS = 'FETCH_MEMBERSHIPS_SUCCESS';
export const FETCH_MEMBERSHIPS_FAILURE = 'FETCH_MEMBERSHIPS_FAILURE';

/* FETCHING */

export const fetchMembershipsRequest = (query) => {
  return {
    type: FETCH_MEMBERSHIPS_REQUEST, 
    query, 
  }
}

export const fetchMembershipsSuccess = (memberships) => {
  return {
    type: FETCH_MEMBERSHIPS_SUCCESS, 
    memberships, 
  }
}

export const fetchMembershipsFailure = (errors) => {
  return {
    type: FETCH_MEMBERSHIPS_FAILURE, 
    errors, 
  }
}


/* CREATION */

export const createMembership = (groupId, userId) => {
  return {
    type: CREATE_MEMBERSHIP,
    payload: {
      groupId, 
      userId, 
    }
  }
}

/* DELETION */

export const deleteMembership = (id) => {
  return {
    type: DELETE_MEMBERSHIP,
    id, 
  }
}

