import React from 'react';
import PropTypes from 'prop-types';

import styles from './GroupList.scss';

import GroupListItem from './GroupListItem/GroupListItem';

function GroupList(props) {
  return (
    <div className={styles['flex-gallery']}>
      {
        props.groups.map(group => (
          <div className={styles['flex-gallery-element']}>
            <GroupListItem
              key={group._id}
              group={group}
            />
          </div>
        ))
      }
    </div>
  );
}

GroupList.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    //slug: PropTypes.string.isRequired,
    //cuid: PropTypes.string.isRequired,
  })).isRequired,
};

export default GroupList;
