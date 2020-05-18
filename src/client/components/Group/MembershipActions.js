
export const CREATE_MEMBERSHIP = 'CREATE_MEMBERSHIP';
export const CREATE_MEMBERSHIP_SUCCESS = 'CREATE_MEMBERSHIP_SUCCESS';

export const DELETE_MEMBERSHIP = 'DELETE_MEMBERSHIP';
export const DELETE_MEMBERSHIP_SUCCESS = 'DELETE_MEMBERSHIP_SUCCESS';

export const SEARCH_MEMBERSHIPS_REQUEST = 'SEARCH_MEMBERSHIPS_REQUEST';
export const SEARCH_MEMBERSHIPS_SUCCESS = 'SEARCH_MEMBERSHIPS_SUCCESS';
export const SEARCH_MEMBERSHIPS_FAILURE = 'SEARCH_MEMBERSHIPS_FAILURE';

export const FETCH_MEMBERSHIP_REQUEST = 'FETCH_MEMBERSHIP_REQUEST';
export const FETCH_MEMBERSHIP_SUCCESS = 'FETCH_MEMBERSHIP_SUCCESS';
export const FETCH_MEMBERSHIP_FAILURE = 'FETCH_MEMBERSHIP_FAILURE';

/* SEARCHING */

export const searchMembershipsRequest = (query) => {
  return {
    type: SEARCH_MEMBERSHIPS_REQUEST, 
    query, 
  }
}

export const searchMembershipsSuccess = (memberships) => {
  return {
    type: SEARCH_MEMBERSHIPS_SUCCESS, 
    memberships, 
  }
}

export const searchMembershipsFailure = (errors) => {
  return {
    type: SEARCH_MEMBERSHIPS_FAILURE, 
    errors, 
  }
}

/* GET ONE */

export const fetchMembershipRequest = (groupId, userId) => {
  return {
    type: FETCH_MEMBERSHIP_REQUEST,
    query: {
      groupId,
      userId, 
    }
  }
}

export const fetchMembershipSuccess = (membership) => {
  return {
    type: FETCH_MEMBERSHIP_SUCCESS,
    membership, 
  }
}

export const fetchMembershipFailure = (errors) => {
  return {
    type: FETCH_MEMBERSHIP_FAILURE, 
    errors, 
  }
}


/* CREATION */

export const createMembership = (groupId, userId, admin=false) => {
  return {
    type: CREATE_MEMBERSHIP,
    payload: {
      groupId, 
      userId, 
      admin, 
    }
  }
}

export const createMembershipSuccess = (membership) => {
  return {
    type: CREATE_MEMBERSHIP_SUCCESS,
    membership, 
  }
}


/* DELETION */

export const deleteMembership = (id) => {
  return {
    type: DELETE_MEMBERSHIP,
    id, 
  }
}

export const deleteMembershipSuccess = (id) => {
  return {
    type: DELETE_MEMBERSHIP_SUCCESS,
    id, 
  }
}

