
import {
  UPLOAD_ALBUM_REQUEST, UPLOAD_PROFILE_REQUEST,
  UPLOAD_SUCCESS, UPLOAD_FAILURE,  
} from './UploadActions';

const initialState = {
  status: null, // can be 'success' or 'error' or null
  errors: null, 
};

const UploadReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPLOAD_PROFILE_REQUEST:
      return initialState;
    case UPLOAD_ALBUM_REQUEST:
      return initialState;
    case UPLOAD_SUCCESS:
      return {
        status: 'success', 
        errors: null, 
      }
    case UPLOAD_FAILURE:
      return {
        status: 'error', 
        errors: action.errors, 
      }
    default:
      return state;
  }
}

export const getUploadStatus = (state) => state.upload.status;
export const getUploadErrors = (state) => state.upload.errors;

export default UploadReducer;
