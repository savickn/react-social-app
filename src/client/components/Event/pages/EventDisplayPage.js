
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faDollarSign, faMap, faCalender, faLocationArrow } from '@fortawesome/free-solid-svg-icons'

import UserInfoPanel from '../../User/components/UserInfoPanel';
import CommentHub from '../../Comment/components/CommentHub';
import AlbumHub from '../../Album/components/AlbumHub';

import { createInviteRequest, searchInviteRequest } from '../InviteActions';
import { getEventRequest, updateEventRequest } from '../EventActions';


import { getCurrentUser } from '../../User/AccountReducer';
import { getGroupById } from '../../Group/GroupReducer';
import { getEventById } from '../EventReducer';
import { getAttendees } from '../InviteReducer';

import { getMonthName } from '../../../util/utilFuncs';

import styles from './EventDisplayPage.scss';

import noImg from '../../../../shared/no-image-icon.png';

// used to display a single Event in complete detail (on separate page)
class EventPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('EventDisplayPage props --> ', props);
    this.state = {};
  }
  
  componentWillMount() {
    const eventId = this.props.match.params.eventId;
    this.props.dispatch(getEventRequest(eventId));
    // query invites
    const query = {
      event: eventId,
      attending: true,
    }
    this.props.dispatch(searchInviteRequest(query));
  }

  /* Component Logic */
 
  // used to determine if current event is Past/Ongoing/Upcoming
  getEventStatus = (start, end) => {
    // if canceled return canceled
    if(Date.now() < new Date(start)) return 'Upcoming';
    if(Date.now() > new Date(end)) return 'Complete';
    return 'Happening Now';
  }

  // used to calculate 'starttime', 'endtime', and 'date' from 'evt' object
  formatDate = (start, end) => {
    let state = {};

    const startDate = new Date(start);
    const endDate = new Date(end);
    const monthName = getMonthName(startDate.getMonth());
    const abbr = monthName.substring(0, 3);

    state['starttime'] = `${startDate.getHours()}:${startDate.getMinutes()}`;
    state['endtime'] = `${endDate.getHours()}:${endDate.getMinutes()}`;
    state['day'] = `${startDate.getDate()}`;
    state['month'] = `${monthName}`;
    state['monthAbbr'] = abbr;
    state['year'] = `${startDate.getFullYear()}`;
    state['date'] = `${monthName} ${startDate.getDate()}, ${startDate.getFullYear()}`; // e.g. March 10th, 2010
    console.log(state);
    return state;
  }

  /* Event Handlers */

  // used to validate whether a User is eligible to attend the Event... should probably be performed server-side
  validateInvite = () => {
    
  }


  // determines whether to show/hide Attend button
  canAttend = () => {
    const userArr = this.props.attendees.map((a) => a.user._id);
    console.log(userArr);

    return !userArr.includes(this.props.currentUser._id);
  }

  // used to add a User to the list of Attendees
  // OLD
  /*attendEvent = () => {
    const attendees = [...this.props.evt.attendees, this.props.currentUser._id];
    this.props.dispatch(updateEventRequest(this.props.evt._id, {attendees}));
  } */

  attendEvent = (e) => {
    const { evt, currentUser } = this.props;

    const invite = {
      event: evt._id,
      user: currentUser._id, 
      issueType: 'User',
      accepted: true, 
      verified: !evt.inviteOnly, // either automatically verify... or send to verification queue 

      attending: true, // for testing purposes... remove later
    };

    console.log('attendEvent inviteObj --> ', invite);

    this.props.dispatch(createInviteRequest(invite));
  }

  /* UI logic */
  
  hasPrice = () => {
    return this.props.evt.price && this.props.evt.price > 0;
  }

  hasImage = () => {
    return this.props.evt.image;
  }

  /* Render Logic */

  render() {
    const { evt, attendees } = this.props;
    if(!evt) return <div></div> 

    const hasImage = this.hasImage();
    const hasPrice = this.hasPrice();

    const canAttend = this.canAttend();

    const status = this.getEventStatus(evt.start, evt.end);
    const date = this.formatDate(evt.start, evt.end);

    return (
      <div className={`${styles.eventPage} background`}>
        <div className={`foreground ${styles.eventHeader}`}>
          
          <div className={`container ${styles.flexHeader}`}>
            <div className={styles.date}>
              <span className={styles.num}>{date.day}</span>
              <span className={styles.abbr}>{date.monthAbbr}</span>
            </div>
             
            <div className={styles.info}>
              <div>{status}</div>
              <div className={styles.title}>{evt.title}</div>
            </div>
          </div>
        </div>

        <div className={`container ${styles.flexEvent}`}>
          <div className={styles.eventInfo}>
            {this.hasImage() && 
              <div>image</div>
            }
            <div>
              <h2>Details</h2>
              <p>{evt.description}</p>
            </div>
            <div>
              <h2>Attendees</h2>
              <div className={styles.attendeesContainer}>
                {attendees && attendees.slice(0, 4).map(a => {
                  console.log(a);
                  return <UserInfoPanel image={a.displayPicture} name={a.user.name} role={'sdfsdf'} />
                })}
                {attendees && attendees.length > 4 && 
                  <div>Show More!</div>
                }
              </div>
            </div>
            <div>
              <h2>Photos</h2>
              <AlbumHub imageableId={evt._id} imageableType='Event'/>
            </div>
            <div className='comments'>
              <h2>Comments</h2>
              <CommentHub parentId={this.props.evt._id} />
            </div>
          </div>

          <div className={`flex-column ${styles.eventSidebar}`}>
            <div className={styles.eventGroupSidebar}>
              <div></div>
              <div>{evt.group.name}</div>
            </div>
            <div className={styles.eventLocationSidebar}>
              <div className='grid-list-elem'>
                <FontAwesomeIcon icon={faClock} className='list-icon' />
                <span className='list-content'> 
                  <div>{date.date}</div>
                  <div>{`${date.starttime} to ${date.endtime}`}</div>
                  <div>Add to Calender</div>
                </span>
              </div>
              {hasPrice && 
                <div className='grid-list-elem'><FontAwesomeIcon icon={faDollarSign} className='list-icon' /> <span className='list-content'> price </span></div>
              }
              <div className='grid-list-elem'><FontAwesomeIcon icon={faMap} className='list-icon' /> <span className='list-content'> location </span></div>
              <div>map</div>
            </div>
          </div>
        </div>

        <div className={`foreground ${styles.eventFooter}`}>
          <div className={`container ${styles.flexFooter}`}>
            <div className='dateTime'>
              <span>{date.date} {date.starttime} </span>
              <div>{evt.title}</div>
            </div>
            <div className='priceAndOpenSlots'>
              { evt.slots === 9999 ? 
                <div></div> :
                <div>{evt.slots - attendees.length} spots remaining!</div>
              }
              { canAttend ? 
                <button className='btn btn-md btn-default' onClick={this.attendEvent}>Attend</button>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/*
<div><FontAwesomeIcon icon={faClock} /><span className='left-padded'> datetime </span></div>
            <div><FontAwesomeIcon icon={faDollarSign} /> <span className='left-padded'> price </span></div>
            <div><FontAwesomeIcon icon={faMap} /> <span className='left-padded'> location </span></div>
            */

/*
<div className={styles.info}>
            <div>{status} Meetup</div>
            <div>{evt.title}</div>
            <div>Hosted By: {evt.creator.name}</div>
            <div>From: {evt.group.name}</div> 
          </div>*/


EventPage.propTypes = {
  evt: PropTypes.object.isRequired,  
  group: PropTypes.object.isRequired, 
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatch, 
  }; 
}

const mapStateToProps = (state, props) => {
  const eventId = props.match.params.eventId;

  return {
    evt: getEventById(state, eventId),
    //group: getGroupById(state, props.evt.group), 
    attendees: getAttendees(state, eventId),
    currentUser: getCurrentUser(state), 
  };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, stateProps, dispatchProps, ownProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(EventPage);


/*
calculateState = () => {
    const { start, end } = this.props.evt;

    const eventState = this.getEventState(start, end);
    const dateObj = this.formatDate(start, end);
    
    const state = {
      eventState, 
      starttime: dateObj.starttime,
      endtime: dateObj.endtime,
      day: dateObj.day, 
      month: dateObj.month, 
      monthAbbr: dateObj.month.slice[0, 3], 
      year: dateObj.year, 
      date: dateObj.date, 
    };
    console.log('EventDisplayPage state --> ', state);
    this.setState(state);
  }
*/

  // fix this, not good strategy
  /*componentWillUpdate(nextProps, nextState) {
    if(this.props.evt) {
      const start = new Date(this.props.evt.start);
      const end = new Date(this.props.evt.end);
      this.setState({...this.formatDate(start, end)});
    }
  }*/


/* OLD
<div>
  <h2>Attendees</h2>
  <div className={styles.attendeesContainer}>
    <div>Show All</div>
    {evt.attendees && evt.attendees.slice(0, 8).map(a => {
      console.log(a);
      return <UserInfoPanel image={a.displayPicture} name={a.name} role={'sdfsdf'} />
    })}
  </div>
</div>
*/