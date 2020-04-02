
import { takeLatest, put, call, fork } from 'redux-saga/effects';

import axios from '../../util/axiosCaller';

import {
  SEARCH_COMMENTS_REQUEST, ADD_COMMENT_REQUEST,
  searchCommentsSuccess, searchCommentsFailure,  
  addCommentSuccess, addCommentFailure, 
} from './CommentActions';


/* AJAX REQUESTS */

function searchComments(query={}) {
  return axios.get('/api/comments/', {
    params: query, 
  })
    .then(res => res.data)
    .catch(err => { throw err; })
}

function addComment(data) {
  return axios.post('/api/comments/', data)
    .then(res => res.data)
    .catch(err => { throw err; })
}


/* SEARCHING */

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

function* addCommentWatcher() {
  yield takeLatest(ADD_COMMENT_REQUEST, addCommentHandler);
}

function* addCommentHandler(action) {
  try {
    const res = yield call(addComment, action.data);
    console.log('addComment res --> ', res);
    yield put(addCommentSuccess(res.comment));
  } catch(err) {
    console.log('addComment error --> ', err);
  }
}


export default [
  fork(addCommentWatcher),
  fork(searchCommentsWatcher), 
]
