
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DateUtil from '../../../util/DateUtil';

import styles from './eventInfo.scss';

// used to display a summary of an Event (e.g. only important details)
// NOTE: meant to be embedded within another page (e.g. via list)
class EventInfo extends React.Component {

  /* Event Handlers */

  // used to create an Invite
  attendEvent = (e) => {
    e.cancelBubble = true;
    if(e.stopPropagation) e.stopPropagation();
    this.props.handleAttend();
  }

  // used to navigate to EventDisplayPage
  navigateToPage = (e) => {
    const { evt, groupId, } = this.props;
    const url = `/groups/${groupId}/events/${evt._id}`;
    this.props.handleNavigate(url);
  }

  /* Render Logic */

  render() {
    const { evt, profileImg, groupId } = this.props;
    if(!evt) return <div></div>

    const dp = evt.profile ? evt.profile.image.path : profileImg;

    const startDate = new Date(evt.start);

    // console.log('eventInfo evt --> ', evt);
    // to={`/groups/${groupId}/events/${evt._id}`}

    return (
        <div className={`${styles.eventContainer} unstyled-link`} onClick={this.navigateToPage}>
          <div className={styles.eventGrid}>
            <div className={styles.eventDetails}>
              <div>{startDate.toDateString()}</div>
              <div className={styles.titleText}>{evt.title}</div>
              <div>{evt.geoJSON.location}</div>
            </div>
            <div className={styles.eventImage}>
              <img src={dp} />
            </div>
            <div className={styles.eventDescription}>
              {evt.description}
            </div>
            <div className={styles.attendees}>
              <div>
                <span></span>
                <span> Attendees</span>
              </div>
            </div>
            <button className={`btn btn-md btn-default ${styles.btnAttend}`} onClick={this.attendEvent}> Attend </button>
          </div>
        </div>
    );
  }
}

EventInfo.propTypes = {
  evt: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired, 
  profileImg: PropTypes.string.isRequired, 

  handleNavigate: PropTypes.func.isRequired, 
  handleAttend: PropTypes.func.isRequired, 
};

export default EventInfo;
