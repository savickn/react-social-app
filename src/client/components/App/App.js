import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import styles from './App.scss';
import routes from '../../routes';

import DevTools from '../../util/devTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Alert from '../Utilities/Alert/alert';
import Spinner from '../Utilities/Spinner/spinkit';
import ChatContainer from '../Chat/components/ChatContainer';

//import { switchLanguage } from '../../modules/Intl/IntlActions';
import { logOut } from '../User/AccountActions';
import { reverseRequest } from '../Utilities/OSM/GeolocationActions';

import { getCurrentUser, getAccountStatus } from '../User/AccountReducer';
import { isLoading } from './AppReducer';

export class App extends React.Component {

  componentDidMount() {
    this.props.dispatch({type: 'RESOLVED'}); // used to remove Spinner after loading
    
    // get user location
    navigator.geolocation.getCurrentPosition((loc) => {
      console.log('coords --> ', loc);
      this.props.dispatch(reverseRequest({
        lat: loc.coords.latitude,
        lon: loc.coords.longitude, 
      }))
    });

    // attempt user auth from localStorage
    if(localStorage.getItem('authToken')) {
      this.props.dispatch({type: 'TOKEN_AUTH'});
    };
  }

  componentWillUnmount() {
    /* probably not working, does closing a page unmount the component???
    if(this.props.authStatus === 'authenticated') {
      console.log('save currentUser to localStorage');
      localStorage.setItem('currentUser', JSON.stringify(this.props.currentUser));
    }*/
  }

  logOut = () => {
    /*localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');*/
    this.props.dispatch(logOut());
  };

  //{this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
  render() {
    return (
      <React.Fragment>
        <Helmet
          title="MyReactApp"
          titleTemplate="%s - Social App"
          base={{
            href: '/',
          }}
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
          /*link={[
            {
              rel: 'stylesheet',
              href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
            },
            {
              rel: 'stylesheet',
              href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
            },
          ]}*/
        />
        <Header
          //switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
          //intl={this.props.intl}
          currentUser={this.props.currentUser}
          authStatus={this.props.authStatus}
          logOut={this.logOut}
        />
        {
          this.props.isLoading ? <Spinner /> :
          <div>
            <Alert />
            <div className='container'>
              {routes}
            </div>
            <ChatContainer currentUser={this.props.currentUser} />
            {/* <DevTools /> */}
            <Footer />
          </div>
        }
      </React.Fragment>
    );
  }
}

App.propTypes = {
  //children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  //intl: PropTypes.object.isRequired,
};

function mapStateToProps(store) {
  return {
    //intl: store.intl,
    currentUser: getCurrentUser(store),
    authStatus: getAccountStatus(store),
    isLoading: isLoading(store),
  };
}

export default withRouter(connect(mapStateToProps)(App));


// old
/*componentDidMount() {
  const currentUser = localStorage.getItem('currentUser');
  const token = localStorage.getItem('authToken');
  if(currentUser && token) {
    console.log('retrieve currentUser from localStorage');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    this.props.dispatch(logInSuccess(JSON.parse(currentUser)));
  }
}*/