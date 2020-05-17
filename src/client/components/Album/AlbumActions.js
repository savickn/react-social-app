
export const CREATE_ALBUM_REQUEST = 'CREATE_ALBUM_REQUEST';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const CREATE_ALBUM_ERROR = 'CREATE_ALBUM_ERROR';

export const SEARCH_ALBUMS_REQUEST = 'SEARCH_ALBUM_REQUEST';
export const SEARCH_ALBUMS_SUCCESS = 'SEARCH_ALBUM_SUCCESS';
export const SEARCH_ALBUMS_ERROR = 'SEARCH_ALBUM_ERROR';

export const DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const DELETE_ALBUM_ERROR = 'DELETE_ALBUM_ERROR';

export const UPDATE_ALBUM_REQUEST = 'UPDATE_ALBUM_REQUEST';
export const UPDATE_ALBUM_SUCCESS = 'UPDATE_ALBUM_SUCCESS';
export const UPDATE_ALBUM_ERROR = 'UPDATE_ALBUM_ERROR';

/* SEARCHING */

export function searchAlbumsRequest(query={}) {
  return {
    type: SEARCH_ALBUMS_REQUEST,
    query
  };
}

export function searchAlbumsSuccess(albums, count) {
  return {
    type: SEARCH_ALBUMS_SUCCESS,
    payload: {
      albums,
      count
    }
  }
}

export function searchAlbumsError(errors) {
  return {
    type: SEARCH_ALBUMS_ERROR,
    errors
  }
}

/* CREATION */

export function createAlbumRequest(album, imagesForm, profileForm) {
  return {
    type: CREATE_ALBUM_REQUEST,
    data: {
      album, 
      imagesForm, 
      profileForm, 
    }
  };
}

export function createAlbumSuccess(album) {
  return {
    type: CREATE_ALBUM_SUCCESS,
    album
  }
}

export function createAlbumError(errors) {
  return {
    type: CREATE_ALBUM_ERROR,
    errors
  }
}

/* UPDATING */

export function updateAlbumRequest(data) {
  return {
    type: UPDATE_ALBUM_REQUEST,
    data,
  };
}

export function updateAlbumSuccess(album) {
  return {
    type: UPDATE_ALBUM_SUCCESS,
    album
  }
}

export function updateAlbumError(errors) {
  return {
    type: UPDATE_ALBUM_ERROR,
    errors
  }
}

/* DELETING */

export function deleteAlbumRequest(id) {
  return {
    type: DELETE_ALBUM_REQUEST,
    id,
  };
}

export function deleteAlbumSuccess(id) {
  return {
    type: DELETE_ALBUM_SUCCESS,
    id,
  };
}

export function deleteAlbumFailure(errors) {
  return {
    type: DELETE_ALBUM_FAILURE,
    errors,
  };
}


