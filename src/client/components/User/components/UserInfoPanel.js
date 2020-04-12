
import React from 'react';
import PropTypes from 'prop-types';

import styles from './UserInfoPanel.scss';

import anonUser from '../anon_user.png';

/* 
* used to show Attendees in Event list... must have
* imagePath
* name
* role in group
*/ 
function UserInfoPanel(props) {
  const dpImage = props.image || anonUser;

  return <div className={styles.panelContainer}>
    <img src={dpImage} height='100' width='100' alt='user-image' />
    <div>{props.name}</div>
    <div>{props.role}</div>
  </div>
}

// can add mutual groups, different styling options, etc

UserInfoPanel.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, 
  role: PropTypes.string.isRequired, 
};

export default UserInfoPanel;
