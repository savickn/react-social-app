
import env from '../../../../server/config/environment';
console.log(env);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faDollarSign, faMap, faCalender, faLocationArrow, faPlus, } from '@fortawesome/free-solid-svg-icons'

//import UserInfoPanel from '../../User/components/UserInfoPanel';
import UserCard from '../../User/components/UserCard';
import CommentHub from '../../Comment/components/CommentHub';
import AlbumHub from '../../Album/components/AlbumHub';
import Modal from '../../Utilities/Modal/modal';
import InviteCollectionPage from '../../Invite/components/InviteCollectionPage';
import InviteWidget from '../../Invite/components/InviteWidget';

import { createInviteRequest, searchInviteRequest, deleteInviteRequest, updateInviteRequest } from '../../Invite/InviteActions';
import { fetchEventRequest, updateEventRequest } from '../EventActions';
import { fetchGroup } from '../../Group/GroupActions';

import { getCurrentUser } from '../../User/AccountReducer';
import { getGroupById } from '../../Group/GroupReducer';
import { getEventById } from '../EventReducer';
import { getAttendees, getInvites, } from '../../Invite/InviteReducer';

import { formatDate } from '../../../util/DateUtil';

import styles from './EventDisplayPage.scss';

import noImg from '../../../../shared/no-image-icon.png';

// used to display a single Event in complete detail (on separate page)
class EventPage extends React.Component {
  
  /* LIFECYCLE LOGIC */

  constructor(props) {
    super(props);
    this.state = {
      showEventModal: false,
      showAttendeesModal: false,
      showRSVPModal: false, 
    };
  }
  
  componentDidMount() {
    console.log('eventDisplayPage props --> ', this.props);
    const { eventId, groupId }  = this.props.match.params;

    this.props.dispatch(fetchEventRequest(eventId));
    this.props.dispatch(fetchGroup(groupId));
    
    // query invites
    const query = {
      event: eventId,
      //status: 'Attending',
    }
    this.props.dispatch(searchInviteRequest(query));
  }

  /* STATE LOGIC */
 
  // used to determine if current event is Past/Ongoing/Upcoming
  getEventStatus = (start, end) => {
    if(this.isCanceled()) return 'Canceled';
    if(Date.now() < new Date(start)) return 'Upcoming';
    if(Date.now() > new Date(end)) return 'Complete';
    return 'Happening Now';
  }


  /* EVENT HANDLERS */

  // used to validate whether a User is eligible to attend the Event... should probably be performed server-side
  validateInvite = () => {
    
  }

  isCanceled = () => {
    return this.props.evt.canceled;
  }

  // verifies that currentUser is the owner of the event
  isOwner = () => {
    const { currentUser, evt } = this.props;
    return evt.creator._id === currentUser._id;
  }

  // determines whether to show/hide Attend button (by checking if currentUser has an existing Invite)
  canAttend = () => {
    const { currentUser, invites, } = this.props;
    if(!currentUser || this.isCanceled()) return false;
    return invites.filter((i) => i.user._id && i.user._id === currentUser._id).length === 0;
  }

  // determines whether currentUser is currently attending
  isAttending = () => {
    const { currentUser, attendees, } = this.props;
    if(!currentUser) return false;
    return attendees.filter((a) => a.user._id === currentUser._id).length > 0;
  }

  // used by external User to create an Invite object (basically request to attend)
  attendEvent = (e) => {
    const { evt, currentUser } = this.props;

    const invite = {
      event: evt._id, 
      user: currentUser._id, 
      issueType: 'User', 
      status: 'Attending', 
      accepted: true, 
      verified: !evt.inviteOnly, // either automatically verify... or send to verification queue 
    };

    if(this.canAttend()) {
      this.props.dispatch(createInviteRequest(invite));
    }
  }

  // used to change from Attending ---> Not Going/etc
  editRsvp = (update) => {
    console.log('rsvp --> ', update);
    const myInvite = this.props.invites.filter((a) => a.user._id === this.props.currentUser._id)[0];
    if(myInvite) {
      this.props.dispatch(updateInviteRequest(myInvite._id, update));
      this.closeModal();
    }
  }

  // used to cancel event or change time/location
  cancelEvent = () => {
    this.props.dispatch(updateEventRequest(this.props.evt._id, {canceled: true}));
  }

  /* modals */

  showAttendees = () => {
    this.setState({
      showEventModal: false,
      showAttendeesModal: true,
      showRSVPModal: false, 
    });
  }

  showEditEventForm = () => {
    this.setState({
      showEventModal: true,
      showAttendeesModal: false,
      showRSVPModal: false, 
    });
  }

  showEditRsvpForm = () => {
    this.setState({
      showEventModal: false,
      showAttendeesModal: false,
      showRSVPModal: true, 
    });
  }

  closeModal = () => {
    this.setState({
      showEventModal: false,
      showAttendeesModal: false,
      showRSVPModal: false, 
    });
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
    const { evt, group, attendees, currentUser, invites } = this.props;
    console.log(evt);
    console.log(currentUser._id);
    console.log('attendees --> ', attendees);
    console.log('invites --> ', invites);
    if(!evt || !group) return <div></div> 

    const groupImg = group.profile && group.profile.image ? group.profile.image.path : noImg;

    const hasImage = this.hasImage();
    const hasPrice = this.hasPrice();

    const myInvite = invites.filter((a) => a.user._id === currentUser._id)[0];
    const canAttend = this.canAttend();
    const isAttending = this.isAttending();

    const status = this.getEventStatus(evt.start, evt.end);
    const dateInfo = formatDate(evt.start, evt.end);

    //console.log('eventPage attendees --> ', attendees);

    return (
      <div className={`${styles.eventPage} background`}>

        {/* HEADER */}
        <div className={`foreground ${styles.eventHeader}`}>  
          <div className={`container`}>
            <div className={styles.eventColumns}> 
              <div className={styles.flexHeaderLeft}>
                <div className={styles.date}>
                  <span className={styles.num}>{dateInfo.s_day}</span>
                  <span className={styles.abbr}>{dateInfo.s_monthAbbr}</span>
                </div>
                
                <div className={styles.info}>
                  <div>{status}</div>
                  <div className={styles.title}>{evt.title}</div>
                </div>
              </div>
              <div className={styles.flexHeaderRight}>
                { this.isOwner() && !this.isCanceled() && 
                  <button className='minimal-btn' onClick={this.showEditEventForm}> Cancel Event</button>  
                }
              </div>
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

            {/* ATTENDEES */}
            <div>
              <h2>Attendees</h2>
              <div className={styles.attendeesContainer}>
                {attendees.length > 0 && attendees.slice(0, 3).map((a) => {
                  return <UserCard user={a.user} />
                  //return <UserInfoPanel key={a.user._id} image={a.displayPicture} name={a.user.name} role={''} />
                })}
                {attendees.length > 3 && 
                  <div onClick={this.showAttendees} className={styles.viewAllAttendeesBtn}>
                      {/*See More*/}
                      <FontAwesomeIcon icon={faPlus} />
                  </div>
                }
              </div>
            </div>
            
            {  /* Photo Album support -- disabled for demo purposes 
            <div>
              <h2>Photos</h2>
              <AlbumHub imageableId={evt._id} imageableType='Event'/>
            </div> 
            */}

            {/* COMMENTS */}
            <div className='comments'>
              <h2>Comments</h2>
              <CommentHub parentId={this.props.evt._id} parentType={'Event'} />
            </div>
          </div>

          <div className={styles.eventGap}></div>

          <div className={`flex-column ${styles.eventSidebar}`}>
            
            {/* GROUP INFO */}
            
              <Link to={`/groups/${group._id}/events`} className={`foreground ${styles.groupSidebar}`}>
                <img src={groupImg} width='50' height='50' rounded />
                <div>{group.name}</div>
              </Link>
              
            
            {/* LOCATION SIDEBAR */}
            <div className={`foreground ${styles.locationSidebar}`}>
              <div className='grid-list-elem'>
                <div className='list-icon'>
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <span className='list-content'> 
                  { dateInfo.sameDay ?
                    <div>{dateInfo.s_date}</div> : 
                    <div>{dateInfo.starttime} on {dateInfo.s_date} to </div>
                  }
                  { dateInfo.sameDay ?
                    <div>{`${dateInfo.starttime} to ${dateInfo.endtime}`}</div> :
                    <div>{dateInfo.endtime} on {dateInfo.e_date}</div>
                  }
                </span>
              </div>
              {hasPrice && 
                <div className='grid-list-elem'><FontAwesomeIcon icon={faDollarSign} className='list-icon' /> <span className='list-content'> price </span></div>
              }
              <div className='grid-list-elem'><FontAwesomeIcon icon={faMap} className='list-icon' /> <span className='list-content'> {evt.geoJSON.location} </span></div>
              <iframe width="300"
                      height="300" 
                      src={`https://www.google.com/maps/embed/v1/place?key=${env.secrets.googleAPI}
                        &q=${evt.geoJSON.location}`}
                      allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>

        <Modal contentWidth="50%"
          isVisible={this.state.showEventModal} close={this.closeModal}>
            <div>
              <div>Are you sure you wish to cancel this event?</div>
              <button onClick={this.cancelEvent}>Yes</button>
              <button onClick={this.closeModal}>No</button>
            </div>
        </Modal>

        { myInvite && 
          <Modal contentWidth="80%" maxWidth="650px"
            isVisible={this.state.showRSVPModal} close={this.closeModal}>
              <InviteWidget invite={myInvite} changeStatus={this.editRsvp} />
          </Modal>
        }

        <Modal contentWidth="50%"
          isVisible={this.state.showAttendeesModal} close={this.closeModal}>
            <InviteCollectionPage eventId={evt._id} />
        </Modal>

        {/* FOOTER */}
        <div className={`foreground ${styles.eventFooter}`}>
          <div className={`container ${styles.flexFooter}`}>
            <div className='dateTime'>
              <span>{dateInfo.s_date} @ {dateInfo.starttime} </span>
              <div>{evt.title}</div>
            </div>
            <div className='priceAndOpenSlots'>
              { evt.slots === 9999 ? 
                <div></div> 
                :
                <div>{evt.slots - attendees.length} spots remaining!</div>
              }
              { !this.isCanceled() ? 
                (canAttend ? 
                  <button className='btn btn-md btn-default' onClick={this.attendEvent}>Attend</button>
                  : (<div>
                      { isAttending ? <div>You are attending!</div> : <div>You are not attending!</div> }
                      <div className='simple-link' onClick={this.showEditRsvpForm}>Edit RSVP?</div>
                    </div>)
                ) : null
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
</div>
*/

// used to add a User to the list of Attendees
// OLD
/*
attendEvent = () => {
  const attendees = [...this.props.evt.attendees, this.props.currentUser._id];
  this.props.dispatch(updateEventRequest(this.props.evt._id, {attendees}));
} 
*/
      

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
    invites: getInvites(state, eventId),
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
/*
componentWillUpdate(nextProps, nextState) {
  if(this.props.evt) {
    const start = new Date(this.props.evt.start);
    const end = new Date(this.props.evt.end);
    this.setState({...this.formatDate(start, end)});
  }
}
*/


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