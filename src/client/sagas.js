

import AccountSagas from './components/User/AccountSagas';
import UserSagas from './components/User/UserSagas';

import GroupSagas from './components/Group/GroupSagas';
import MembershipSagas from './components/Group/MembershipSagas';

import EventSagas from './components/Event/EventSagas';
import InviteSagas from './components/Event/InviteSagas';
import CommentSagas from './components/Comment/CommentSagas';

import UploadSagas from './components/Upload/UploadSagas';
import ProfileSagas from './components/Profile/ProfileSagas';
import AlbumSagas from './components/Album/AlbumSagas';

import AlertSagas from './components/Utilities/Alert/alertSagas';

import OSMSagas from './components/Utilities/OSM/GeolocationSagas';

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
    ...OSMSagas, 
    ...AccountSagas,
    ...AlertSagas,
    ...GroupSagas,
    ...MembershipSagas, 
    ...InviteSagas, 
    ...UploadSagas, 
    ...CommentSagas, 
    ...ProfileSagas, 
  ])
}

