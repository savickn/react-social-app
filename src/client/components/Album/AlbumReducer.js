import { CREATE_ALBUM_REQUEST, CREATE_ALBUM_SUCCESS, CREATE_ALBUM_ERROR, 
  FETCH_ALBUMS_REQUEST, FETCH_ALBUMS_SUCCESS, FETCH_ALBUMS_ERROR,
  UPDATE_ALBUM_REQUEST, UPDATE_ALBUM_SUCCESS, UPDATE_ALBUM_ERROR,
  DELETE_ALBUM_REQUEST, DELETE_ALBUM_SUCCESS, DELETE_ALBUM_ERROR,
} from './AlbumActions';

import { updateByObjectId, removeByObjectId, matchByObjectId, } from '../../util/utilFuncs';

const initialState = { 
  status: 'idle',
  data: [], // should be structured like 'offset: [values]' ??? MAYBE
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
const AlbumReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS_REQUEST :
      return {
        ...state,
        status: 'loading',
        errors: null,
      };
    case FETCH_ALBUMS_SUCCESS :
      console.log('state.data --> ', state.data);
      console.log('payload.albums --> ', action.payload.albums);
      return {
        ...state,
        status: 'idle',
        data: [/*...state.data,*/ ...action.payload.albums],
        len: action.payload.count
      };
    case FETCH_ALBUMS_ERROR :
      return {
        ...state,
        status: 'error',
        errors: action.errors,
      };
    
    case CREATE_ALBUM_REQUEST :
      return {
        ...state,
        status: 'loading',
        errors: null
      };
    case CREATE_ALBUM_SUCCESS :
      return {
        ...state,
        status: 'idle',
        data: [action.album, ...state.data],
        len: state.len + 1,
      };
    case CREATE_ALBUM_ERROR :
      return {
        ...state,
        status: 'error',
        errors: action.errors,
      };

    case UPDATE_ALBUM_REQUEST :
      return {
        ...state, 
        status: 'loading', 
        errors: null
      };
    case UPDATE_ALBUM_SUCCESS : 
      return {
        ...state, 
        status: 'idle',
        data: updateByObjectId(state.data, action.album),
      };
    case UPDATE_ALBUM_ERROR : 
      return {
        ...state, 
        status: 'error',
        errors: action.errors,
      };

    case DELETE_ALBUM_REQUEST : 
      return {
        ...state,
        status: 'loading',
        errors: null,
      };
    case DELETE_ALBUM_SUCCESS :
      return {
        ...state,
        data: removeByObjectId(state.data, action.id),
        len: state.len - 1,
      };
    case DELETE_ALBUM_ERROR : 
      return {
        ...state,
        status: 'error',
        errors: action.errors,
      };
    default:
      return state;
  }
};

export const getAlbums = state => state.albums.data || [];
export const getAlbumCount = state => state.albums.len || 0;
export const getAlbumErrors = state => state.albums.errors || {};
export const getAlbumStatus = state => state.albums.status;

export const getAlbumById = (state, id) => state.albums.data.filter(album => album._id === id)[0];


export default AlbumReducer;
