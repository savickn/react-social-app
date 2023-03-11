
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'


import EventInfo from '../components/eventInfo';
import EventForm from '../components/eventForm';
import Modal from '../../Utilities/Modal/modal';
import PaginationScroll from '../../Utilities/PaginationScroll/PaginationScroll';

import { createEventRequest, searchEventsRequest, clearCollection } from '../EventActions';
import { getEvents, getEventCount } from '../EventReducer';
import { getCurrentUser } from '../../User/AccountReducer';
import { getAutocomplete, getLocation, getGeojson } from '../../Utilities/OSM/GeolocationReducer';
import { autocompleteRequest, } from '../../Utilities/OSM/GeolocationActions';
import { createInviteRequest } from '../../Invite/InviteActions';

import styles from './EventCollectionPage.scss';

// used to display a collection of Events
class EventCollectionPage extends React.Component {

                                /* Lifecycle logic */
  
  constructor(props) {
    super(props);
    //console.log('EventCollectionPage props --> ', props);
    this.state = {
      modalVisibility: false, 
      searchMode: 'Upcoming', // filter for Events... either 'Past' or 'Upcoming'
      listMode: 'List', 
      pageSize: 5,
    };
  }

  componentDidMount() {
    this.queryEvents(); 
  }

                                /* Component logic */

  // used for initial queries (e.g. on page load, on change search criteria)
  queryEvents = () => {
    console.log('querying events!');
    this.props.dispatch(searchEventsRequest({ 
      group: this.props.groupId, 
      searchMode: this.state.searchMode, 
      pageSize: this.state.pageSize 
    }));
  }

  // used to load more events based on current search criteria, WORKING
  loadMore = () => {
    let query = {
      group: this.props.groupId, 
      searchMode: this.state.searchMode, 
      pageSize: this.state.pageSize, 
      offset: this.props.events.length,
    };
    this.props.dispatch(searchEventsRequest(query));
  }

  // used to change the 'searchMode', should refactor to only send HTTP request when necessary
  changeSearchMode = (se) => {
    console.log(se.target);
    const previousSearchMode = localStorage.getItem('EventSearchMode');
    //if(previousSearchMode === se.target.innerText) return; // NOT WORKING PROPERLY
    this.setState({searchMode: se.target.innerText}, () => {
      if(typeof window !== undefined) {
        localStorage.setItem('EventSearchMode', this.state.searchMode);
      }
      this.props.dispatch(clearCollection());
      this.queryEvents();
    });
  }

  // change between list and calender modes... NOT IMPLEMENTED
  changeListMode = (se) => {
    this.setState({listMode: se.target.innerText});
  }


  /* EVENT ATTENDANCE */

  // determines whether to show/hide Attend button... WORKING
  canAttend = (evt) => {
    const { currentUser, } = this.props;
    if(!currentUser) return false;

    const userArr = evt.invites.map((inv) => inv.user ? inv.user._id : null);
    console.log(userArr);

    return !userArr.includes(currentUser._id);
  }

  // used by external User to create an Invite object (basically request to attend)
  attendEvent = (evt) => {
    const { currentUser } = this.props;

    const invite = {
      event: evt._id,
      user: currentUser._id, 
      issueType: 'User',
      status: 'Attending',
      accepted: true, 
      verified: !evt.inviteOnly, // either automatically verify... or send to verification queue 
    };

    console.log('attendEvent inviteObj --> ', invite);

    if(this.canAttend(evt)) {
      this.props.dispatch(createInviteRequest(invite));
      this.queryEvents();
    }
  }

  navigateToEvent = (url) => {
    this.props.history.push(url);
  }


                                  /* Event Form Logic */

  addEvent = (eventData) => {
    // guard against already expired Events && end dates that are before start dates
    if(eventData.start < new Date() || eventData.start >= eventData.end) {
      return;
    }

    console.log('eventDate --> ', eventData);
    const locData = eventData.location;

    const location = locData.display_name.split(', ')[0];
    const geoJSON = {
      type: 'Point',
      coordinates: [ Number.parseFloat(locData.lon), Number.parseFloat(locData.lat) ],
      location, 
    };

    eventData.geoJSON = geoJSON;
    delete eventData.location;

    this.props.dispatch(createEventRequest(eventData));
    this.closeModal();
  }

  // query OSM for location suggestions
  getSuggestions = (query) => {
    const country_code = this.props.location.address.country_code;
    this.props.dispatch(autocompleteRequest({ location: query, country_code }));
  }


                                  /* Modal Logic */

  openModal = () => {
    this.setState({ modalVisibility: true });
  }

  closeModal = () => {
    this.setState({ modalVisibility: false });
  }

                                  /* Styling logic */

  /*styleSidebarElement = (text) => {
    return this.state.searchMode === text ? `${styles.sidebarElem} ${styles.selected}` : styles.sidebarElem;
  }*/

  styleListSelector = (text) => {
    return this.state.listMode === text ? `minimal-btn selected` : 'minimal-btn unselected';
  }

                                  /* UI Methods */

  /*renderEventList = () => {
    return this.props.events ? <EventList events={this.props.events}/> : <div></div>
  }*/

  hasEventsToLoad = () => {
    return this.props.events.length < this.props.eventCount;
  }

  render() {
    //console.log('eventCollectionState --> ', this.state);

    const { searchMode } = this.state;

    return (
      <div className={styles.eventsContainer}>
        <div className={styles.banner}>
          {/*<div className={styles.listSelector}>
            <span className={this.styleListSelector('List')} onClick={this.changeListMode}>List</span>
            <span className={this.styleListSelector('Calender')} onClick={this.changeListMode}>Calender</span>  
          </div>*/}
          <button className={`${styles.addEventBtn} btn btn-default`} onClick={this.openModal}> Add Event </button>
        </div>

        <div className={`background full-width`}>
          <div className={`${styles.listAndSidebar} container`}>
            
            {/* filter events by date (e.g. upcoming vs. past) */}
            <div className={styles.sortingSidebar}>
              <div className={styles.sidebarElem} onClick={this.changeSearchMode}>
                <span>Upcoming </span>
                { searchMode === 'Upcoming' &&
                  <FontAwesomeIcon icon={faCircle} color='lightgreen' />
                }
              </div>
              <div className={styles.sidebarElem} onClick={this.changeSearchMode}>
                <span>Past </span>
                { searchMode === 'Past' && 
                  <FontAwesomeIcon icon={faCircle} color='lightgreen' />
                }
              </div>
            </div>

            {/* renders list of events from this.props.events */}
            <div className={styles.eventList}>
              { this.props.events.length < 1 && 
                <div className={styles.noEvent}>There are no events at this time.</div>
              }
              {this.props.events.map((evt) => {
                const canAttend = this.canAttend(evt);
                return <EventInfo key={evt._id} evt={evt} groupId={this.props.groupId} 
                  handleNavigate={this.navigateToEvent} handleAttend={this.attendEvent} canAttend={canAttend} />
              })}
              {/* conditionally render pagination */}
              { this.hasEventsToLoad() && 
                <button className='btn btn-default' onClick={this.loadMore}>Show More</button>
              }
            </div>
          </div>
        </div>
        
        {/* conditionally render EventForm within Modal */}
        <Modal isVisible={this.state.modalVisibility} close={this.closeModal}>
          <EventForm creatorId={this.props.currentUser._id} groupId={this.props.groupId} 
            createEvent={this.addEvent} getSuggestions={this.getSuggestions} 
            locationSuggestions={this.props.suggestions} />
        </Modal>
      </div>
    );
  }
}

// <PaginationScroll loadMore={this.loadEvents} collectionSize={this.props.eventCount} loadedCount={this.props.events.length}/>

EventCollectionPage.propTypes = {
  groupId: PropTypes.string.isRequired, // used to fetch events by group
};

const mapStateToProps = (state, props) => {
  return {
    currentUser: getCurrentUser(state),
    events: getEvents(state), // returns Array 
    eventCount: getEventCount(state), 

    // geocoding 
    location: getLocation(state),
    geojson: getGeojson(state),
    suggestions: getAutocomplete(state), 
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    //addEvent: (eventData) => dispatch(createEventRequest(eventData)), 
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EventCollectionPage);

