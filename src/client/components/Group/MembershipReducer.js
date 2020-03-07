
import { FETCH_MEMBERSHIPS_REQUEST, FETCH_MEMBERSHIPS_SUCCESS, FETCH_MEMBERSHIPS_FAILURE } from './MembershipActions';

const initialState = {
  status: 'idle',
  data: [],
  errors: null, 
}

const MembershipReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MEMBERSHIPS_REQUEST:
      return {
        ...state, 
        status: 'fetching',
        errors: null,  
      };
    case FETCH_MEMBERSHIPS_SUCCESS:
      return {
        ...state, 
        status: 'idle', 
        data: action.memberships, 
      };
    case FETCH_MEMBERSHIPS_FAILURE:
      return {
        ...state, 
        status: 'error', 
        errors: action.errors, 
      }
    default:
      return state;
  }
}

export const getMemberships = (state) => state.memberships.data;
export const getErrors = (state) => state.memberships.errors;
export const getStatus = (state) => state.memberships.status;

export default MembershipReducer;
