
export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR';

export const CREATE_PROFILE_REQUEST = 'CREATE_PROFILE_REQUEST';
export const CREATE_PROFILE_SUCCESS = 'CREATE_PROFILE_SUCCESS';
export const CREATE_PROFILE_ERROR = 'CREATE_PROFILE_ERROR';

/* FETCH PROFILE */

export const fetchProfileRequest = (id) => {
  return {
    type: FETCH_PROFILE_REQUEST, 
    id, 
  }
}

export const fetchProfileSuccess = (profile) => {
  return {
    type: FETCH_PROFILE_SUCCESS, 
    profile, 
  }
}

export const fetchProfileError = (error) => {
  return {
    type: FETCH_PROFILE_ERROR,
    error, 
  }
}

/* CREATE PROFILE */

export const createProfileRequest = (profileData, formData) => {
  return {
    type: CREATE_PROFILE_REQUEST,
    data: {
      profileData,
      formData,
    } 
  };
}

export const createProfileSuccess = (profile) => {
  return {
    type: CREATE_PROFILE_SUCCESS, 
    profile, 
  }
}

export const createProfileError = (error) => {
  return {
    type: CREATE_PROFILE_ERROR,
    error, 
  }
}
