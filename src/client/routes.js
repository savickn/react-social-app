
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import Spinner from 'react-spinkit';


import ProtectedRoute from './components/ProtectedRoute/protectedRoute';

const options = {
  fallback: <Spinner name='circle' />,
  //fallback: <div> Loading... </div>
};

const ModalWizardPage = loadable(() => import('./components/Prototypes/ModalWizardTestPage'), options)
const StylesTest = loadable(() => import('./components/Prototypes/StylesTestPage'), options);
const CommentTest = loadable(() => import('./components/Comment//components/CommentHub'), options);

const AdminPage = loadable(() => import('./components/App/components/Admin/AdminPage'), options);
const ToDoHub = loadable(() => import('./components/ToDo/todoHub'), options);

const HomePage = loadable(() => import('./components/App/components/Home/HomePage'), options);
const AboutComponent = loadable(() => import('./components/StaticPages/about'), options);
const LoginPage = loadable(() => import('./components/User/pages/UserLoginPage/UserLoginPage'), options);
const SignUpPage = loadable(() => import('./components/User/pages/UserCreatePage/UserCreatePage'), options);
const ProfilePage = loadable(() => import('./components/User/pages/UserProfilePage/UserProfilePage'), options);
const GroupDisplayPage = loadable(() => import('./components/Group/pages/GroupDisplayPage'), options);
const GroupHomePage = loadable(() => import('./components/Group/pages/GroupHomePage'), options);
const EventDisplayPage = loadable(() => import('./components/Event/pages/EventDisplayPage'), options);

export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/users/login" component={LoginPage} />
    <Route path="/users/new" component={SignUpPage} />
    <ProtectedRoute path="/users/:userId" component={ProfilePage} />
    <Route exact path="/groups" component={GroupHomePage} />
    <ProtectedRoute path="/groups/:groupId" component={GroupDisplayPage} />
    <Route path='/about' component={AboutComponent} />
    <Route path='/events/:eventId' component={EventDisplayPage} />

    <ProtectedRoute path="/admin" component={AdminPage} role='admin' />
    <ProtectedRoute path='/todos' component={ToDoHub} />
    <ProtectedRoute path="/modalwizard" component={ModalWizardPage} role='admin' />
    <ProtectedRoute path="/stylesTest" component={StylesTest} role='admin' />
    <ProtectedRoute path="/commentTest" component={CommentTest} role='admin' />
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