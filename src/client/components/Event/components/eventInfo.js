
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './eventInfo.scss';

// used to display a summary of an Event (e.g. only important details)
// NOTE: meant to be embedded within another page (e.g. via list)
class EventInfo extends React.Component {
  
  /* class logic */

  formatDate = () => {

  }

  /* event handlers */

  attendEvent = (se) => {
    console.log('attend event');
  }

  /* UI Methods */

  render() {
    console.log('eventInfo props --> ', this.props);
    if(!this.props.evt) return <div></div>
    const { evt } = this.props;

    return (
        <Link className={`${styles.eventContainer} unstyled-link`} to={`/events/${evt._id}`} >
          <div className={styles.eventGrid}>
            <div className={styles.eventDetails}>
              <div>{evt.title}</div>
              <div>{evt.location}</div>
            </div>
            <div className={styles.eventImage}>
              Image Here
            </div>
            <div className={styles.eventDescription}>
              {evt.description}
            </div>
            <div className={styles.attendees}>
              <div>
                <span></span>
                <span>{evt.attendees.length} Attendees</span>
              </div>
            </div>
            <button className={`btn btn-md btn-default ${styles.btnAttend}`} onClick={this.attendEvent}> Attend </button>
          </div>
        </Link>
    );
  }
}

EventInfo.propTypes = {
  evt: PropTypes.object.isRequired,
};

export default EventInfo;
