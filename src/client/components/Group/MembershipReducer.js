
import { 
  CREATE_MEMBERSHIP_SUCCESS,
  DELETE_MEMBERSHIP_SUCCESS, 
  SEARCH_MEMBERSHIPS_REQUEST, SEARCH_MEMBERSHIPS_SUCCESS, SEARCH_MEMBERSHIPS_FAILURE, 
  FETCH_MEMBERSHIP_REQUEST, FETCH_MEMBERSHIP_SUCCESS, FETCH_MEMBERSHIP_FAILURE,
} from './MembershipActions';

const initialState = {
  status: 'idle',
  data: [],
  myMembership: null,
  errors: null, 
}

const MembershipReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_MEMBERSHIP_SUCCESS:
      return {
        ...state, 
        myMembership: action.membership,
      };
    case DELETE_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        myMembership: null, 
      };

    case SEARCH_MEMBERSHIPS_REQUEST:
      return {
        ...state, 
        status: 'fetching',
        errors: null,  
      };
    case SEARCH_MEMBERSHIPS_SUCCESS:
      return {
        ...state, 
        status: 'idle', 
        data: action.memberships, 
      };
    case SEARCH_MEMBERSHIPS_FAILURE:
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
        myMembership: action.membership, 
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

export const myMembership = (state) => state.memberships.myMembership;

export const getMemberships = (state) => state.memberships.data;
export const getErrors = (state) => state.memberships.errors;
export const getStatus = (state) => state.memberships.status;

export default MembershipReducer;
