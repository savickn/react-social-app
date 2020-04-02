
import { FETCH_MEMBERSHIPS_REQUEST, FETCH_MEMBERSHIPS_SUCCESS, FETCH_MEMBERSHIPS_FAILURE, FETCH_MEMBERSHIP_REQUEST, FETCH_MEMBERSHIP_SUCCESS, FETCH_MEMBERSHIP_FAILURE } from './MembershipActions';

const initialState = {
  status: 'idle',
  data: [],
  userMembership: null,
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

    case FETCH_MEMBERSHIP_REQUEST:
      return {
        ...state,
        status: 'fetching',
        errors: null, 
      }
    case FETCH_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        status: 'idle',
        userMembership: action.membership, 
      }
    case FETCH_MEMBERSHIP_FAILURE:
      return {
        ...state,
        status: 'error',
        errors: action.errors, 
      }
    default:
      return state;
  }
}


/*export const getMembership = (state, groupId, userId) => state.memberships.data.filter((ms) => {
  if(ms.group === groupId && ms.user === userId) return ms;
})[0];*/

export const getMembership = (state) => state.memberships.userMembership;
export const getMemberships = (state) => state.memberships.data;
export const getErrors = (state) => state.memberships.errors;
export const getStatus = (state) => state.memberships.status;

export default MembershipReducer;
