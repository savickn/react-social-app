
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faDollarSign, faMap, faCalender, faLocationArrow, faPlus, } from '@fortawesome/free-solid-svg-icons'

import UserInfoPanel from '../../User/components/UserInfoPanel';
import CommentHub from '../../Comment/components/CommentHub';
import AlbumHub from '../../Album/components/AlbumHub';

import { createInviteRequest, searchInviteRequest } from '../InviteActions';
import { fetchEventRequest, updateEventRequest } from '../EventActions';
import { fetchGroup } from '../../Group/GroupActions';


import { getCurrentUser } from '../../User/AccountReducer';
import { getGroupById } from '../../Group/GroupReducer';
import { getEventById } from '../EventReducer';
import { getAttendees } from '../InviteReducer';

import { formatDate } from '../../../util/DateUtil';

import styles from './EventDisplayPage.scss';

import noImg from '../../../../shared/no-image-icon.png';

// used to display a single Event in complete detail (on separate page)
class EventPage extends React.Component {
  
  /* LIFECYCLE LOGIC */

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    console.log('eventDisplayPage props --> ', this.props);
    const { eventId, groupId }  = this.props.match.params;

    this.props.dispatch(fetchEventRequest(eventId));
    this.props.dispatch(fetchGroup(groupId));
    
    // query invites
    const query = {
      event: eventId,
      attending: true,
    }
    this.props.dispatch(searchInviteRequest(query));
  }

  /* STATE LOGIC */
 
  // used to determine if current event is Past/Ongoing/Upcoming
  getEventStatus = (start, end) => {
    // if canceled return canceled
    if(Date.now() < new Date(start)) return 'Upcoming';
    if(Date.now() > new Date(end)) return 'Complete';
    return 'Happening Now';
  }


  /* EVENT HANDLERS */

  // used to validate whether a User is eligible to attend the Event... should probably be performed server-side
  validateInvite = () => {
    
  }


  // determines whether to show/hide Attend button
  canAttend = () => {
    const { currentUser, attendees, } = this.props;
    if(!currentUser) return false;

    const userArr = attendees.map((a) => a.user._id);
    //console.log(userArr);

    return !userArr.includes(currentUser._id);
  }

  // used by external User to create an Invite object (basically request to attend)
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

    if(this.canAttend()) {
      this.props.dispatch(createInviteRequest(invite));
    }
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
    const { evt, group, attendees, } = this.props;
    if(!evt || !group) return <div></div> 

    const groupImg = group.profile && group.profile.image ? group.profile.image.path : noImg;

    const hasImage = this.hasImage();
    const hasPrice = this.hasPrice();

    const canAttend = this.canAttend();

    const status = this.getEventStatus(evt.start, evt.end);
    const date = formatDate(evt.start, evt.end);

    console.log('eventPage attendees --> ', attendees);

    return (
      <div className={`${styles.eventPage} background`}>

        {/* HEADER */}
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

        {/* BODY */}
        <div className={`container ${styles.flexEvent}`}>

          {/* CONTENT */}
          <div className={styles.eventBody}>
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
                {attendees.length > 0 && attendees.slice(0, 3).map(a => {
                  return <UserInfoPanel key={a.user._id} image={a.displayPicture} name={a.user.name} role={''} />
                })}
                {attendees.length > 3 && 
                  <Link to='' className='addIcon'>
                    <div>
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </Link>
                }
              </div>
            </div>
            <div>
              <h2>Photos</h2>
              <AlbumHub imageableId={evt._id} imageableType='Event'/>
            </div>

            {/* COMMENTS */}
            <div className='comments'>
              <h2>Comments</h2>
              <CommentHub parentId={this.props.evt._id} />
            </div>
          </div>

          <div className={styles.eventGap}></div>

          <div className={`flex-column ${styles.eventSidebar}`}>
            
            {/* GROUP INFO */}
            <div className={`foreground ${styles.groupSidebar}`}>
              <Link to={`/groups/${group._id}`}>
                <img src={groupImg} width='50' height='50' />
              </Link>
              <div>{group.name}</div>
            </div>
            
            {/* LOCATION SIDEBAR */}
            <div className={`foreground ${styles.locationSidebar}`}>
              <div className='grid-list-elem'>
                <div className='list-icon'>
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <span className='list-content'> 
                  <div>{date.date}</div>
                  <div>{`${date.starttime} to ${date.endtime}`}</div>
                </span>
              </div>
              {hasPrice && 
                <div className='grid-list-elem'><FontAwesomeIcon icon={faDollarSign} className='list-icon' /> <span className='list-content'> price </span></div>
              }
              <div className='grid-list-elem'><FontAwesomeIcon icon={faMap} className='list-icon' /> <span className='list-content'> {evt.location} </span></div>
              <iframe width="250"
                      height="250" 
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCpq4jPk_kzCr-oIfSvyDwio7ZS-KVLENI
                        &q=${evt.location}`}
                      allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className={`foreground ${styles.eventFooter}`}>
          <div className={`container ${styles.flexFooter}`}>
            <div className='dateTime'>
              <span>{date.date} {date.starttime} </span>
              <div>{evt.title}</div>
            </div>
            <div className='priceAndOpenSlots'>
              { evt.slots === 9999 ? 
                <div></div> 
                :
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

  // used to parse a list of Users that is currently set to attend the event (e.g. creator + verified invites)
  // returns empty Array by default
  // getAttendees = () => {
  //   return [this.props.evt.creator, ...this.props.attendees];
  // }

/*

<Link to={`/groups/${evt.group.id}`}>
                <img src={groupImg} width='50' height='50' />
              </Link>
              */


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

  // used to add a User to the list of Attendees
  // OLD
  /*attendEvent = () => {
    const attendees = [...this.props.evt.attendees, this.props.currentUser._id];
    this.props.dispatch(updateEventRequest(this.props.evt._id, {attendees}));
  } */
      

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
  const { eventId, groupId } = props.match.params;

  return {
    evt: getEventById(state, eventId),
    group: getGroupById(state, groupId), 
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