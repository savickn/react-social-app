
import {
  SEARCH_COMMENTS_REQUEST, SEARCH_COMMENTS_SUCCESS, SEARCH_COMMENTS_FAILURE, 
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
} from './CommentActions';

const initialState = {
  data: []
}

const CommentReducer = (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_COMMENTS_SUCCESS:
      return {
        data: action.comments, 
      }
    case ADD_COMMENT_SUCCESS:
      return {
        data: [...state.data, action.comment], 
      }
    default: 
      return state;
  }
}

export const getComments = (state) => state.comments.data;

export default CommentReducer;
