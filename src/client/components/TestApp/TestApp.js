import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import styles from './TestApp.scss';

import Header from './components/Header/Header';
import HomePage from './components/Home/HomePage';
import ToDoHub from '../ToDo/todoHub';
import AboutComponent from '../StaticPages/about';

import { getAccountStatus, getCurrentUser } from '../User/AccountReducer';
import { getCount, INCREMENT_ASYNC } from './TestReducer';

export class App extends React.Component {

  increment = () => {
    this.props.dispatch({ type: INCREMENT_ASYNC });
  }

  render() {
    return (
      <React.Fragment>
        <Header
          currentUser={this.props.currentUser}
          authStatus={this.props.authStatus}
        />
        <div> Count: {this.props.count} </div>
        <button onClick={this.increment}>Increment</button>
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/todos' component={ToDoHub} />
          <Route path='/about' component={AboutComponent} />  
        </Switch>
      </React.Fragment>
    );
  };
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    currentUser: getCurrentUser(state),
    authStatus: getAccountStatus(state),
    count: getCount(state),
  };
};

export default connect(mapStateToProps)(App);


/*
<Route exact path="/" component={Routes.HomePage} />
<Route path="/admin" component={Routes.AdminPage} />
<Route path="/users/login" component={Routes.LoginPage} />
<Route path="/users/new" component={Routes.SignUpPage} />
<Route path="/users/:userId" component={Routes.ProfilePage} />
<Route exact path="/groups" component={Routes.GroupHomePage} />
<Route path="/groups/:groupId" component={Routes.GroupDisplayPage} />
*/