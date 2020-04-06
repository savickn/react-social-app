
import React from 'react';
import PropTypes from 'prop-types';

import styles from './listStyles.scss';

const ListTypes = [
  'VerticalList',
  'GridList',
];

// used to display data in a particular format (e.g. Grid vs. VerticalList vs. ???)
class GenericList extends React.Component {
  
  getClass = () => {

  }
  
  render() {
    return (
      <div>
        {this.props.items.map((item) => {
          return <EventInfo key={evt._id} event={evt} />
        })}
      </div>
    );
  }
}

GenericList.defaultProps = {
  type: 'VerticalList',
};

GenericList.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string, 
};

export default GenericList;

