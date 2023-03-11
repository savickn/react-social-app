
// registers sub-documents in the Redux Store (e.g. state.users, state.posts)
import app from './components/App/AppReducer';
import users from './components/User/UserReducer';
import groups from './components/Group/GroupReducer';
import account from './components/User/AccountReducer';
//import test from './components/TestApp/TestReducer';
//import todos from './components/ToDo/todoReducer';
import events from './components/Event/EventReducer';
import memberships from './components/Group/MembershipReducer';
import invites from './components/Invite/InviteReducer';
import upload from './components/Upload/UploadReducer';
import comments from './components/Comment/CommentReducer';
import profiles from './components/Profile/ProfileReducer';
import albums from './components/Album/AlbumReducer';

import chat from './components/Chat/ChatReducer';

//import wizard
import alerts from './components/Utilities/Alert/alertReducer';
import modal from './components/Utilities/Modal/modalReducer';
import page from './components/Utilities/Pagination/PaginationReducer';

import osm from './components/Utilities/OSM/GeolocationReducer';

// return list of Reducers which will be combined via 'combineReducers'
let reducers = {
  //todos,
  //test,
  app,
  users,
  groups,
  events,
  account,
  alerts,
  modal,
  page,
  invites,
  memberships, 
  upload, 
  comments, 
  profiles, 
  albums, 
  osm, 
  chat, 
};

export default reducers;
