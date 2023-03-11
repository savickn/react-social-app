
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './UserCard.scss';

import anonUser from '../anon_user.png';

// very basic icon class that shows the Profile picture of a User (for use in lists/etc)
class UserCard extends React.Component {

  render() {
    const { user } = this.props;
    const pic = user.profile ? user.profile.image.path : anonUser;

    //console.log('usercard user --> ', user);

    const contentWidth = Number.parseInt(this.props.contentWidth) || 100;
    const contentHeight = Number.parseInt(this.props.contentHeight) || 100;

    return (
      <Link to={`/users/${user._id}`} className={`${styles.cardContainer}`}>
        <div>
          <img src={pic} width={0.75*contentWidth} height={0.75*contentHeight} />
        </div>
        <div className={styles.name}>{user.name}</div>
        { 
        /*
        <div>{user.role}</div> 
        <div>shared groups</div> 
        */ 
        }
      </Link>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,  
    profile: PropTypes.string.isRequired, 
  }),
  contentWidth: PropTypes.string,
  contentHeight: PropTypes.string,
};

export default UserCard;
