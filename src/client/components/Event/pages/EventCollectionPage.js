
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EventList from '../components/eventList';
import EventInfo from '../components/eventInfo';
import EventForm from '../components/eventForm';
import Modal from '../../Utilities/Modal/modal';
import PaginationScroll from '../../Utilities/PaginationScroll/PaginationScroll';

import { createEventRequest, fetchEventsRequest, clearCollection } from '../EventActions';
import { getEvents, getEventCount } from '../EventReducer';
import { getCurrentUser } from '../../User/AccountReducer';

import styles from './EventCollectionPage.scss';

// used to render a page displaying a collection of Events
class EventCollectionPage extends React.Component {

                                /* Lifecycle logic */
  
  constructor(props) {
    super(props);
    console.log('EventCollectionPage props --> ', props);
    this.state = {
      modalVisibility: false, 
      searchMode: 'Upcoming', 
      listMode: 'List', 
      pageSize: 5,
    };
  }

  componentWillMount() {
    if(this.props.events.length === 0) {
      this.queryEvents();
    }
  }

                                /* Component logic */

  // used for initial queries (e.g. on page load, on change search criteria)
  queryEvents = () => {
    this.props.dispatch(fetchEventsRequest({ group: this.props.groupId, searchMode: this.state.searchMode, pageSize: this.state.pageSize }));
  }

  // used to load more events based on current search criteria, WORKING
  loadMore = () => {
    let query = {
      group: this.props.groupId, 
      searchMode: this.state.searchMode, 
      pageSize: this.state.pageSize, 
      offset: this.props.events.length,
    };
    this.props.dispatch(fetchEventsRequest(query));
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

  changeListMode = (se) => {
    this.setState({listMode: se.target.innerText});
  }


                                  /* Event Form Logic */

  addEvent = (eventData) => {
    console.log('eventDate --> ', eventData);
    this.props.dispatch(createEventRequest(eventData));
    this.closeModal();
  }

                                  /* Modal Logic */

  openModal = () => {
    this.setState({modalVisibility: true});
  }

  closeModal = () => {
    this.setState({modalVisibility: false});
  }

                                  /* Styling logic */

  styleSidebarElement = (text) => {
    return this.state.searchMode === text ? `${styles.sidebarElem} ${styles.selected}` : styles.sidebarElem;
  }

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
    console.log('eventCollectionState --> ', this.state);

    return (
      <div className={styles.eventsContainer}>
        <div className={styles.banner}>
          <div className={styles.listSelector}>
            <span className={this.styleListSelector('List')} onClick={this.changeListMode}>List</span>
            <span className={this.styleListSelector('Calender')} onClick={this.changeListMode}>Calender</span>  
          </div>
          <button className={`${styles.addEventBtn} btn btn-default`} onClick={this.openModal}> Add Event </button>
        </div>


        <div className={`${styles.fullWidthBackground} full-width`}>
          <div className={`${styles.listAndSidebar} container`}>
            <div className={styles.sortingSidebar}>
              <div className={this.styleSidebarElement('Upcoming')} onClick={this.changeSearchMode}>Upcoming</div>
              <div className={this.styleSidebarElement('Past')} onClick={this.changeSearchMode}>Past</div>
              <div className={this.styleSidebarElement('Proposed')} onClick={this.changeSearchMode}>Proposed</div>
            </div>

            <div className={styles.eventList}>
              {this.props.events.map((evt) => {
                return <EventInfo key={evt._id} evt={evt} />
              })}
            </div>
          </div>
        </div>

        { this.hasEventsToLoad() && 
          <button onClick={this.loadMore}>Show More</button>
        }
            
        <Modal isVisible={this.state.modalVisibility} close={this.closeModal}>
          <EventForm creatorId={this.props.currentUser._id} groupId={this.props.groupId} createEvent={this.addEvent} />
        </Modal>
      </div>
    );
  }
}

// <PaginationScroll loadMore={this.loadEvents} collectionSize={this.props.eventCount} loadedCount={this.props.events.length}/>

EventCollectionPage.propTypes = {
  groupId: PropTypes.string.isRequired, 
};

const mapStateToProps = (state, props) => {
  return {
    currentUser: getCurrentUser(state),
    events: getEvents(state), 
    eventCount: getEventCount(state), 
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    //addEvent: (eventData) => dispatch(createEventRequest(eventData)), 
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EventCollectionPage);

