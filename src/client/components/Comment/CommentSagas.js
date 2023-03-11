
import { takeLatest, put, call, fork, select } from 'redux-saga/effects';

import axios from '../../util/axiosCaller';

import {
  SEARCH_COMMENTS_REQUEST, ADD_COMMENT_REQUEST,
  searchCommentsSuccess, searchCommentsFailure,  
  addCommentSuccess, addCommentFailure, 
  TOGGLE_UPVOTE_REQUEST, toggleUpvoteSuccess,
  fetchCommentSuccess, FETCH_COMMENT_REQUEST, 
} from './CommentActions';

import { getCommentById, } from './CommentReducer';

/* FETCH ONE */

function fetchComment(id) {
  return axios.get(`/api/comments/${id}`)
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* fetchCommentWatcher() {
  yield takeLatest(FETCH_COMMENT_REQUEST, fetchCommentHandler);
}

function* fetchCommentHandler(action) {
  try {
    const res = yield call(fetchComment, action.id);
    console.log(res);
    yield put(fetchCommentSuccess(res.comment));
  } catch(err) {
    console.log('fetchComment err --> ', err);
  }
}


/* SEARCHING */

function searchComments(query={}) {
  return axios.get('/api/comments/', {
    params: query, 
  })
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* searchCommentsWatcher() {
  yield takeLatest(SEARCH_COMMENTS_REQUEST, searchCommentsHandler);
}

function* searchCommentsHandler(action) {
  try {
    const res = yield call(searchComments, action.query);
    console.log('searchComments res --> ', res);
    yield put(searchCommentsSuccess(res.comments));
  } catch(err) {
    console.log('searchComments error --> ', err);
  }
}


/* CREATING */

function addComment(data) {
  return axios.post('/api/comments/', data)
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* addCommentWatcher() {
  yield takeLatest(ADD_COMMENT_REQUEST, addCommentHandler);
}

function* addCommentHandler(action) {
  try {
    const res = yield call(addComment, action.data);
    console.log('addComment res --> ', res);
    if(res.comment.parentType === 'Comment') {
      const oldComment = yield select(getCommentById, res.comment.parent);
      oldComment.comments.push(res.comment);
      console.log('oldComment --> ', oldComment);
      yield put(toggleUpvoteSuccess(oldComment));
    } else {
      yield put(addCommentSuccess(res.comment));
    }
  } catch(err) {
    console.log('addComment error --> ', err);
  }
}

/* UPVOTE */

function toggleUpvote(commentId, authorId) {
  return axios.patch(`/api/comments/${commentId}/upvote`, { authorId })
    .then(res => res.data)
    .catch(err => { throw err; })
}

function* toggleUpvoteWatcher() {
  yield takeLatest(TOGGLE_UPVOTE_REQUEST, toggleUpvoteHandler);
}

function* toggleUpvoteHandler(action) {
  try {
    const res = yield call(toggleUpvote, action.payload.commentId, action.payload.authorId);
    yield put(toggleUpvoteSuccess(res.comment));
  } catch(err) {
    console.log('toggleUpvoteError --> ', err);
  }
}


export default [
  fork(fetchCommentWatcher),
  fork(toggleUpvoteWatcher),
  fork(addCommentWatcher),
  fork(searchCommentsWatcher), 
]
