
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './UserInfoPanel.scss';

import anonUser from '../anon_user.png';

// used to link to User and show summary of important info
class UserInfoPanel extends React.Component {
  
  render() {
    const { user, image, } = this.props;
    const dpImage = image || anonUser;

    return (
      <Link className={`${styles.eventContainer} unstyled-link`} to={`/users/${user._id}`} >
        <div className='imgPanel'>

        </div>

        <div className='infoPanel'>
          <div>name</div>
          <div>join date</div>
          <div>groups in common</div>
          <div>optional description</div>

          <div>message btn</div>
        </div>
      </Link>
    );
  }
}

// can add mutual groups, different styling options, etc

UserInfoPanel.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired, 
    role: PropTypes.string.isRequired, 
  })
};

export default UserInfoPanel;
