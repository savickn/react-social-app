
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import Spinner from 'react-spinkit';


import ProtectedRoute from './components/Utilities/ProtectedRoute/protectedRoute';

const options = {
  fallback: <Spinner name='circle' />,
  //fallback: <div> Loading... </div>
};

const OSMPage = loadable(() => import('./components/Prototypes/OpenStreetMap'), options)
const ModalWizardPage = loadable(() => import('./components/Prototypes/ModalWizardTestPage'), options)
const StylesTest = loadable(() => import('./components/Prototypes/StylesTestPage'), options);
const CommentTest = loadable(() => import('./components/Comment//components/CommentHub'), options);

const AdminPage = loadable(() => import('./components/App/components/Admin/AdminPage'), options);
const HomePage = loadable(() => import('./components/App/components/Home/HomePage'), options);
const AboutComponent = loadable(() => import('./components/StaticPages/about'), options);
const LoginPage = loadable(() => import('./components/User/pages/UserLoginPage/UserLoginPage'), options);
const SignUpPage = loadable(() => import('./components/User/pages/UserCreatePage/UserCreatePage'), options);
const ProfilePage = loadable(() => import('./components/User/pages/UserProfilePage/UserProfilePage'), options);
const GroupDisplayPage = loadable(() => import('./components/Group/pages/GroupDisplayPage'), options);
const GroupCollectionPage = loadable(() => import('./components/Group/pages/GroupCollectionPage'), options);
const EventDisplayPage = loadable(() => import('./components/Event/pages/EventDisplayPage'), options);
const AlbumDisplayPage = loadable(() => import('./components/Album/pages/AlbumPage'), options);

export default (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route path='/users/login' component={LoginPage} />
    <Route path='/users/new' component={SignUpPage} />
    <ProtectedRoute path='/users/:userId' component={ProfilePage} />
    
    <Route exact path='/groups' component={GroupCollectionPage} />
    <Route exact path='/groups/:groupId/events/:eventId' component={EventDisplayPage} />
    <ProtectedRoute path='/groups/:groupId' component={GroupDisplayPage} />
    <Route path='/albums/:albumId' component={AlbumDisplayPage} />
    <Route path='/about' component={AboutComponent} />

    <ProtectedRoute path="/admin" component={AdminPage} role='admin' />
    <ProtectedRoute path="/modalwizard" component={ModalWizardPage} role='admin' />
    <ProtectedRoute path="/stylesTest" component={StylesTest} role='admin' />
    <ProtectedRoute path="/commentTest" component={CommentTest} role='admin' />
    <ProtectedRoute path="/openstreetmap" component={OSMPage} role='admin' />
  </Switch>
)



/*
import HomePage from './components/App/components/Home/HomePage';
import AdminPage from './components/App/components/Admin/AdminPage';
import ToDoHub from './components/ToDo/todoHub';
import AboutComponent from './components/StaticPages/about';
import LoginPage from './components/User/pages/UserLoginPage/UserLoginPage';
import SignUpPage from './components/User/pages/UserCreatePage/UserCreatePage';
import ProfilePage from './components/User/pages/UserProfilePage/UserProfilePage';
import GroupDisplayPage from './components/Group/pages/GroupDisplayPage';
import GroupHomePage from './components/Group/pages/GroupHomePage';
*/