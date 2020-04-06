
import {
  CREATE_PROFILE_REQUEST, CREATE_PROFILE_SUCCESS, CREATE_PROFILE_ERROR, 
  FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_ERROR, 
} from './ProfileActions';

const initialState = {
  data: [], 
}

const ProfileReducer = (state=initialState, action) => {
  switch(action.type) {
    case CREATE_PROFILE_SUCCESS:
      return {
        data: [...state.data, action.profile]
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        data: [...state.data, action.profile]
      };
    default:
      return state;
  }
}

export const getProfileById = (state, id) => state.profiles.data.filter(profile => profile._id === id)[0];

export default ProfileReducer;
