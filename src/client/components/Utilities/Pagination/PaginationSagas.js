
import { takeLatest, put, call, select } from 'redux-saga/effects';


function* pageChangeWatcher() {
  yield takeLatest('CHANGE_PAGE', pageChangeHandler);
}

function* pageChangeHandler(action) {
  try {
    const { id, page } = action.payload;
    

  } catch (error) {
    console.log('pagination error --> ', error);
  }
}




export default [
  fork(pageChangeWatcher),
];
