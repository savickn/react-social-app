
export const SEARCH_COMMENTS_REQUEST = 'SEARCH_COMMENTS_REQUEST';
export const SEARCH_COMMENTS_SUCCESS = 'SEARCH_COMMENTS_SUCCESS';
export const SEARCH_COMMENTS_FAILURE = 'SEARCH_COMMENTS_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

/* FETCHING */

export const searchCommentsRequest = (query) => {
  return {
    type: SEARCH_COMMENTS_REQUEST,
    query, 
  }
}

export const searchCommentsSuccess = (comments) => {
  return {
    type: SEARCH_COMMENTS_SUCCESS,
    comments, 
  }
}

export const searchCommentsFailure = (errors) => {
  return {
    type: SEARCH_COMMENTS_FAILURE,
    errors, 
  }
}

/* CREATING */

export const addCommentRequest = (data) => {
  return {
    type: ADD_COMMENT_REQUEST, 
    data, 
  }
}

export const addCommentSuccess = (comment) => {
  return {
    type: ADD_COMMENT_SUCCESS, 
    comment, 
  }
}

export const addCommentFailure = (errors) => {
  return {
    type: ADD_COMMENT_FAILURE,
    errors, 
  }
}
