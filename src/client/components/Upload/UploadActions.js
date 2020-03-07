
export const UPLOAD_PROFILE_REQUEST = 'UPLOAD_PROFILE_REQUEST';
export const UPLOAD_ALBUM_REQUEST = 'UPLOAD_ALBUM_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'; 
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

/* Action Creators */

export const uploadProfileRequest = (formData) => {
  return {
    type: UPLOAD_PROFILE_REQUEST,
    formData, 
  }
}

export const uploadAlbumRequest = () => {
  return {
    type: UPLOAD_ALBUM_REQUEST,
    formData, 
  }
}

export const uploadSuccess = () => {
  return {
    type: UPLOAD_SUCCESS, 
  }
}

export const uploadFailure = (errors) => {
  return {
    type: UPLOAD_FAILURE, 
    errors, 
  }
}






