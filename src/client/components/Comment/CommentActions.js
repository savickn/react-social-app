
export const TOGGLE_UPVOTE_REQUEST = 'TOGGLE_UPVOTE_REQUEST';
export const TOGGLE_UPVOTE_SUCCESS = 'TOGGLE_UPVOTE_SUCCESS';

export const SEARCH_COMMENTS_REQUEST = 'SEARCH_COMMENTS_REQUEST';
export const SEARCH_COMMENTS_SUCCESS = 'SEARCH_COMMENTS_SUCCESS';
export const SEARCH_COMMENTS_FAILURE = 'SEARCH_COMMENTS_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const FETCH_COMMENT_REQUEST = 'FETCH_COMMENT_REQUEST';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';

/* FETCH ONE */

export const fetchCommentRequest = (id) => {
  return {
    type: FETCH_COMMENT_REQUEST,
    id, 
  }
}

export const fetchCommentSuccess = (comment) => {
  return {
    type: FETCH_COMMENT_SUCCESS,
    comment, 
  }
}

/* SEARCHING */

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

/* UPVOTES */

export const toggleUpvoteRequest = (commentId, authorId) => {
  return {
    type: TOGGLE_UPVOTE_REQUEST,
    payload: {
      commentId,
      authorId,
    }
  }
}

export const toggleUpvoteSuccess = (comment) => {
  return {
    type: TOGGLE_UPVOTE_SUCCESS,
    comment, 
  }
}
