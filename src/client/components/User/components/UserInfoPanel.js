
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'

import styles from './UserInfoPanel.scss';

import anonUser from '../anon_user.png';

// used to link to User and show summary of important info
class UserInfoPanel extends React.Component {
  
  // used to open ChatView between two Users
  messageUser = (e) => {
    e.preventDefault();
    this.props.startChat(this.props.user._id);
  }

  render() {
    const { user, image, } = this.props;
    const dpImage = image || anonUser;

    return (
      <Link className={`${styles.panelContainer} unstyled-link`} to={`/users/${user._id}`} >

        { /* upper row of content */ }
        <div className={styles.userContainer}>
          <div className='imgPanel'>
            <img src={dpImage} height='75' width='75' className='img-round' />
          </div>

          <div className={styles.infoPanel}>
            <div>{user.name}</div>
            { /* <div>join date</div> */ }
          </div>

          <div className={styles.msgBtn} onClick={this.messageUser} >
            <FontAwesomeIcon icon={faCommentAlt} size='2x' />
          </div>
        </div>

        { /* optionally show common groups */ }
        { false ? 
          <div className={styles.userGroups}>
            groups
          </div> : <div style={{display: 'none'}}></div>
        }

        { /* optionally show group-specific description */ }
        { false ? 
          <div className={styles.userDesc}>
            desc
          </div> : <div style={{display: 'none'}}></div>
        }
      
      </Link>
    );
  }
}

// can add mutual groups, different styling options, etc
UserInfoPanel.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    //image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired, 
    role: PropTypes.string.isRequired, 
  }),

  startChat: PropTypes.func, 
};

export default UserInfoPanel;
