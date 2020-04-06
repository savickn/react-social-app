
//export const UPLOAD_PROFILE_REQUEST = 'UPLOAD_PROFILE_REQUEST';
//export const UPLOAD_ALBUM_REQUEST = 'UPLOAD_ALBUM_REQUEST';


export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'; 
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

/* Action Creators */

// upload an Image
export const uploadRequest = (data) => {
  return {
    type: UPLOAD_REQUEST,
    data, 
  }
}

// handle successful upload
export const uploadSuccess = () => {
  return {
    type: UPLOAD_SUCCESS, 
  }
}

// handle failed upload
export const uploadFailure = (errors) => {
  return {
    type: UPLOAD_FAILURE, 
    errors, 
  }
}




/*
// upload to a Profile
export const uploadProfileRequest = (formData) => {
  return {
    type: UPLOAD_PROFILE_REQUEST,
    payload: {
      formData, // basically for image data 
      imageableId,
      imageableType, 
      profileId, 
    }
  }
}

// upload to an Album
export const uploadAlbumRequest = () => {
  return {
    type: UPLOAD_ALBUM_REQUEST,
    formData, 
  }
}
*/


