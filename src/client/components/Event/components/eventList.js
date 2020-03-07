
import React from 'react';
import PropTypes from 'prop-types';

import EventInfo from './eventInfo';

// used to render a list of EventInfo objects
class EventList extends React.Component {
  render() {
    const { events } = this.props.events;

    return (
      <div>
        {events && events.map((evt) => {
          return <EventInfo key={evt._id} evt={evt} />
        })}
      </div>
    )
  }
}

EventList.propTypes = {
  events: PropTypes.array.isRequired,
};

export default EventList;
