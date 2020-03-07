import { FETCH_GROUP_REQUEST, FETCH_GROUP_SUCCESS, FETCH_GROUP_ERROR, 
  CREATE_GROUP_REQUEST, CREATE_GROUP_SUCCESS, CREATE_GROUP_ERROR, 
  FETCH_GROUPS_REQUEST, FETCH_GROUPS_SUCCESS, FETCH_GROUPS_ERROR,
  UPDATE_GROUP_REQUEST, UPDATE_GROUP_SUCCESS, UPDATE_GROUP_ERROR,
  DELETE_GROUP_REQUEST, DELETE_GROUP_SUCCESS, DELETE_GROUP_ERROR,
} from './GroupActions';

import { updateByObjectId, removeByObjectId, matchByObjectId, } from '../../util/utilFuncs';

const initialState = { 
  status: 'idle',
  data: [], // should be structured like 'offset: [values]' ??? MAYBE
  lastGroup: null, // tracks newly added groups
  len: 0, // used to track total database entries for pagination
  errors: null
};

/*
* Valid status' include:
* idle --> 
* loading --> 
* error --> 
*/

// must set 'len' from server response header
const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUP_REQUEST :
      return {
        ...state,
        status: 'loading',
        errors: null,
      };
    case FETCH_GROUP_SUCCESS : 
      return {
        ...state,
        status: 'idle',
        data: [...state.data, action.group],
        lastGroup: null, 
      };
    case FETCH_GROUP_ERROR : 
      return {
        ...state,
        status: 'error',
        errors: action.errors,
      };

    case FETCH_GROUPS_REQUEST :
      return {
        ...state,
        status: 'loading',
        errors: null,
      };
    case FETCH_GROUPS_SUCCESS :
      console.log('state.data --> ', state.data);
      console.log('payload.groups --> ', action.payload.groups);
      return {
        ...state,
        status: 'idle',
        data: [/*...state.data,*/ ...action.payload.groups],
        lastGroup: null, 
        len: action.payload.count
      };
    case FETCH_GROUPS_ERROR :
      return {
        ...state,
        status: 'error',
        errors: action.errors,
      };
    
    case CREATE_GROUP_REQUEST :
      return {
        ...state,
        status: 'loading',
        errors: null
      };
    case CREATE_GROUP_SUCCESS :
      return {
        ...state,
        status: 'idle',
        data: [action.group, ...state.data],
        lastGroup: action.group, 
        len: state.len + 1,
      };
    case CREATE_GROUP_ERROR :
      return {
        ...state,
        status: 'error',
        errors: action.errors,
      };

    case UPDATE_GROUP_REQUEST :
      return {
        ...state, 
        status: 'loading', 
        errors: null
      };
    case UPDATE_GROUP_SUCCESS : 
      return {
        ...state, 
        status: 'idle',
        data: updateByObjectId(state.data, action.group),
      };
    case UPDATE_GROUP_ERROR : 
      return {
        ...state, 
        status: 'error',
        errors: action.errors,
      };

    case DELETE_GROUP_REQUEST : 
      return {
        ...state,
        status: 'loading',
        errors: null,
      };
    case DELETE_GROUP_SUCCESS :
      return {
        ...state,
        data: removeByObjectId(state.data, action.id),
        len: state.len - 1,
      };
    case DELETE_GROUP_ERROR : 
      return {
        ...state,
        status: 'error',
        errors: action.errors,
      };
    default:
      return state;
  }
};

export const getGroups = state => state.groups.data || [];
export const getGroupCount = state => state.groups.len || 0;
export const getGroupErrors = state => state.groups.errors || {};
export const getGroupStatus = state => state.groups.status;

export const getGroupById = (state, id) => state.groups.data.filter(group => group._id === id)[0];
export const getLastGroup = (state) => state.lastGroup;

export const getGroupByPage = (state, page, perPage) => {
  const offset = (page - 1) * perPage;
  return state.groups.data.map((group, idx) => {
    if(idx >= offset && idx < (offset + perPage)) {
      return group;
    }
  })
}

export default GroupReducer;
