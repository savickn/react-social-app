
import React from 'react';
import PropTypes from 'prop-types';

import styles from './UserIcon.scss';

import anonUser from '../anon_user.png';

// very basic icon class that shows the Profile picture of a User (for use in lists/etc)
class UserIcon extends React.Component {
  render() {
    return (
      <div className={styles.flexRow}>
        <div className={styles.flexImage}>word</div>
        <div className={styles.flexInfo}>
          <p>1</p>
          <p>2</p>
          <p>3</p>
        </div>
      </div>
    );
  }
}

UserIcon.defaultProps = {
  displayPicture: anonUser,
};

UserIcon.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  displayPicture: PropTypes.string,
};

export default UserIcon;
