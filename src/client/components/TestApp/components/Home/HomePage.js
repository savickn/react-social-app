import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAccountStatus, getCurrentUser } from '../../../User/AccountReducer';

class HomePage extends React.Component {
  
  changeRouteOnClick = (se) => {
    console.log('context --> ', this.context);
    this.context.router.history.push('/todos');
  }
  
  render() {
    const isLoggedIn = this.props.authStatus === 'authenticated';
    return (
      <div>
        {!isLoggedIn &&
          <div>
            <p>Welcome to TheSocialSpot. Please 'log in' above to get started.</p>
            <button onClick={this.changeRouteOnClick}>Go to Todos</button>
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

HomePage.propTypes = {
  authStatus: PropTypes.string.isRequired,
};

HomePage.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    authStatus: getAccountStatus(state),
    currentUser: getCurrentUser(state),
  };
}

export default connect(mapStateToProps)(HomePage);
