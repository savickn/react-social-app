
import React from 'react';
import PropTypes from 'prop-types';

import styles from './UserCard.scss';

import anonUser from '../anon_user.png';

// very basic icon class that shows the Profile picture of a User (for use in lists/etc)
class UserCard extends React.Component {

  render() {
    const { user } = this.props;
    const pic = user.profile || anonUser;

    console.log(user);

    return (
      <div className={styles.cardContainer}>
        <div>
          <img src={pic} width='75' height='75' />
        </div>
        <div className={styles.name}>{user.name}</div>
        { 
        /*
        <div>{user.role}</div> 
        <div>shared groups</div> 
        */ 
        }
      </div>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,  
    profile: PropTypes.string.isRequired, 
  })
};

export default UserCard;
