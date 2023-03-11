
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
    case UPDATE_INVITE_SUCCESS:
      console.log(action);
      return {
        data: state.data.map(i => {
          return i._id === action.invite._id ? action.invite : i;
        }),
      }
    case DELETE_INVITE_SUCCESS:
      return {
        data: state.data.filter(i => i._id !== action.id)
      }
    default:
      return state;
  }
}

export const getInvites = (state, id) => state.invites.data.filter(i => i.event === id);
export const getAttendees = (state, id) => state.invites.data.filter(i => {
  return i.event === id && i.status === "Attending";
});
//export const getMyInvite = (state, evtId, userId) => state.invites.data.filter(i => i.event === evtId && i.user === userId);

export default InviteReducer;