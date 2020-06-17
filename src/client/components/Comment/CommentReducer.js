
import { updateByObjectId } from '../../util/utilFuncs';

import {
  SEARCH_COMMENTS_REQUEST, SEARCH_COMMENTS_SUCCESS, SEARCH_COMMENTS_FAILURE, 
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
  FETCH_COMMENT_SUCCESS, 
  TOGGLE_UPVOTE_SUCCESS, 
} from './CommentActions';

const initialState = {
  data: []
}

const CommentReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_COMMENT_SUCCESS:
      return {
        data: updateByObjectId(state.data, action.comment), 
      }
    case SEARCH_COMMENTS_SUCCESS:
      return {
        data: action.comments, 
      }
    case ADD_COMMENT_SUCCESS:
      return {
        data: [...state.data, action.comment], 
      }
    case TOGGLE_UPVOTE_SUCCESS:
      return {
        data: updateByObjectId(state.data, action.comment), 
      }
    default: 
      return state;
  }
}

export const getComments = (state) => state.comments.data;
export const getCommentById = (state, id ) => state.comments.data.filter(c => c._id === id)[0];

export default CommentReducer;
