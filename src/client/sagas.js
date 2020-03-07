
import TodoSagas from './components/ToDo/todoSagas';
import AccountSagas from './components/User/AccountSagas';
import UserSagas from './components/User/UserSagas';
import AlertSagas from './components/Alert/alertSagas';
import GroupSagas from './components/Group/GroupSagas';
import AlbumSagas from './components/Album/AlbumSagas';
import EventSagas from './components/Event/EventSagas';
import MembershipSagas from './components/Group/MembershipSagas';
import InviteSagas from './components/Event/InviteSagas';
import UploadSagas from './components/Upload/UploadSagas';

//import { watchIncrementAsync } from './components/TestApp/TestSagas';
//import { addUserWatcher } from './components/User/UserSagas';
//import { todoWatcher } from './components/ToDo/todoSagas';

import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    //addUserWatcher()
    //watchIncrementAsync(),
    //todoWatcher,
    ...EventSagas, 
    ...AlbumSagas, 
    ...UserSagas,
    ...TodoSagas,
    ...AccountSagas,
    ...AlertSagas,
    ...GroupSagas,
    ...MembershipSagas, 
    ...InviteSagas, 
    ...UploadSagas, 
  ])
}

