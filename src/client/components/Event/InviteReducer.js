
import {
  SEARCH_INVITE_REQUEST, SEARCH_INVITE_SUCCESS, 
  CREATE_INVITE_REQUEST, CREATE_INVITE_SUCCESS,
  DELETE_INVITE_REQUEST, DELETE_INVITE_SUCCESS,
  UPDATE_INVITE_REQUEST, UPDATE_INVITE_SUCCESS, 
} from './InviteActions';

const initialState = {
  data: [], 
}

const InviteReducer = (state=initialState, action) => {
  switch(action.type) {
    case SEARCH_INVITE_SUCCESS:
      return {
        data: [...action.invites], 
      }
    case CREATE_INVITE_SUCCESS:
      return {
        data: [...state.data, action.invite], 
      }
    case DELETE_INVITE_SUCCESS:
      return {
        data: state.data.filter(i => i._id !== action.id)
      }
    default:
      return state;
  }
}

export const getInvites = (state) => state.invites.data;
export const getAttendees = (state, id) => state.invites.data.filter(i => i.event === id);

export default InviteReducer;