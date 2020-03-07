import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './HomePage.scss';

import { getAccountStatus, getCurrentUser } from '../../../User/AccountReducer';

class HomePage extends React.Component {
  
  render() {
    const isLoggedIn = this.props.authStatus === 'authenticated';
    //console.log(this.props.store.getState());
    return (
      <div>
        {!isLoggedIn &&
          <div>
            Welcome to TheSocialSpot. Please 'log in' above to get started.
          </div>
        }
        {isLoggedIn &&
          <div className='homePage'>
            <div className='nextEvent'>
              Next Event
            </div>
            <div className='searchBar'>
              Search Bar
            </div>
            <div className='upcomingEvents'>
              <div className='content'>
                Upcoming Events
              </div>
              <div className='sidebar'>
                <div className='eventFilters'>
                  Event Filters
                </div>
                <div className='eventCalender'>
                  Calender
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authStatus: getAccountStatus(state),
    currentUser: getCurrentUser(state),
  };
}

HomePage.propTypes = {
  authStatus: PropTypes.string.isRequired,
};

HomePage.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(HomePage);
