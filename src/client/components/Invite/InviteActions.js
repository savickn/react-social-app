
export const SEARCH_INVITE_REQUEST = 'SEARCH_INVITE_REQUEST';
export const SEARCH_INVITE_SUCCESS = 'SEARCH_INVITE_SUCCESS';

export const CREATE_INVITE_REQUEST = 'CREATE_INVITE_REQUEST';
export const CREATE_INVITE_SUCCESS = 'CREATE_INVITE_SUCCESS';

export const DELETE_INVITE_REQUEST = 'DELETE_INVITE_REQUEST';
export const DELETE_INVITE_SUCCESS = 'DELETE_INVITE_SUCCESS';

export const UPDATE_INVITE_REQUEST = 'UPDATE_INVITE_REQUEST';
export const UPDATE_INVITE_SUCCESS = 'UPDATE_INVITE_SUCCESS';

/* SEARCH */

export const searchInviteRequest = (query) => {
  return {
    type: SEARCH_INVITE_REQUEST, 
    query, 
  }
}

export const searchInviteSuccess = (invites) => {
  return {
    type: SEARCH_INVITE_SUCCESS,
    invites, 
  }
}

/* CREATE */

export const createInviteRequest = (data) => {
  return {
    type: CREATE_INVITE_REQUEST,
    data, 
  }
}

export const createInviteSuccess = (invite) => {
  return {
    type: CREATE_INVITE_SUCCESS,
    invite, 
  }
}

/* DELETE */

export const deleteInviteRequest = (id) => {
  return {
    type: DELETE_INVITE_REQUEST,
    id, 
  }
}

export const deleteInviteSuccess = (id) => {
  return {
    type: DELETE_INVITE_SUCCESS,
    id, 
  }
}


/* UPDATE */

export const updateInviteRequest = (id, data) => {
  return {
    type: UPDATE_INVITE_REQUEST,
    data, 
    id,
  }
}

export const updateInviteSuccess = (invite) => {
  return {
    type: UPDATE_INVITE_SUCCESS,
    invite, 
  }
}

