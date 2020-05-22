import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//import Upload from '../../../Upload/components/upload';
import Profile from '../../../Profile/Profile';

import { uploadRequest } from '../../../Upload/UploadActions';
import { updateUserRequest } from '../../UserActions';

import { getUploadStatus, getUploadErrors } from '../../../Upload/UploadReducer';
import { getCurrentUser } from '../../AccountReducer';

import styles from './UserProfilePage.scss';

export class UserProfilePage extends React.Component {

  /* UI logic */

  /*getDisplayPicture = () => {
    if(!this.props.currentUser.displayPicture || this.props.currentUser.displayPicture.length < 1) return noDp;
    return this.props.currentUser.displayPicture[0];
  }*/

  getInterests = () => {
    const interests = this.props.currentUser.interests;
    return interests.length > 0 ? interests.map(i => {
      return <div>{i}</div>;
    }) : <p>Not yet added</p>;
  }

  getBio = () => {
    return this.props.currentUser.bio || <Link to=''>Add a bio</Link> 
  }

  render() {
    const { currentUser } = this.props;
    console.log('profilePage currentUser --> ', currentUser);
    if(!currentUser) return <div></div>; // should prob redirect instead

    //const dp = this.getDisplayPicture();

    //console.log('profilePage props --> ', this.props);
    //console.log('profilePage dp --> ', dp);

    return (
      <div className='container'>

        <div className='sidebar'>
          <div>
          <Profile 
                profileId={this.props.currentUser.profile} 
                imageableId={this.props.currentUser._id} 
                imageableType='User'
              />
          </div>
          <div>{currentUser.name}</div>
          <div>{currentUser.location}</div>
          <div>bio</div>
        </div>

        <div className='content'>
          <div className={styles.groupContainer}>
            { currentUser.groups.map((m) => {
              return <img src={m.group.profile.image.path} height='50' width='50' />
            })}
          </div>
        </div>

        {/*
        <div className={styles.profileContainer}>
          <div className={styles.profileContent}>
            <div className={styles.infoGrid}>
              <h1 className={styles.header}>{this.props.currentUser.name}</h1>
              <div className={styles.location}>Location: {this.props.currentUser.location}</div>
              <div className={styles.joinDate}>Member Since: </div>
              <div className={styles.socialNetworks}>Networks: </div>
              <p className={styles.bio}>{this.getBio()}</p>
            </div>
            <div className={styles.meetups}>
              <h2>Member of {this.props.currentUser.groups.length} Meetups</h2>
              <div>
                {this.props.currentUser.groups.slice(0, 10).map(g => {
                  return <div></div>
                })}
              </div>
            </div>
          </div>
          <div className={styles.profileSidebar}>
            <div className={styles.displayPictureContainer}>
              <Profile 
                profileId={this.props.currentUser.profile} 
                imageableId={this.props.currentUser._id} 
                imageableType='User'
              />
            </div>
            <div className={styles.interests}>
              <h2>Interests</h2>
              <button>Edit</button>
              {this.getInterests()}
            </div>
          </div>
        </div>
              */ }

      </div>
      
    );
  }
};

UserProfilePage.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    location: PropTypes.string,
    bio: PropTypes.string,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    currentUser: getCurrentUser(state), 
    uploadStatus: getUploadStatus(state),
    uploadErrors: getUploadErrors(state), 
  }
}

export default connect(mapStateToProps)(UserProfilePage);



/* OLD 

<div className={styles.profileContainer}>
  <div className={styles.profileContent}>
    <div className={styles.infoGrid}>
      <h1 className={styles.header}>{this.props.currentUser.name}</h1>
      <div className={styles.location}>Location: {this.props.currentUser.location}</div>
      <div className={styles.joinDate}>Member Since: </div>
      <div className={styles.socialNetworks}>Networks: </div>
      <p className={styles.bio}>{this.getBio()}</p>
    </div>
    <div className={styles.meetups}>
      <h2>Member of {this.props.currentUser.groups.length} Meetups</h2>
      <div>
        {this.props.currentUser.groups.slice(0, 10).map(g => {
          return <div></div>
        })}
      </div>
    </div>
  </div>
  <div className={styles.profileSidebar}>
    <div className={styles.displayPictureContainer}>
      <Profile 
        profileId={this.props.currentUser.profile} 
        imageableId={this.props.currentUser._id} 
        imageableType='User'
      />
    </div>
    <div className={styles.interests}>
      <h2>Interests</h2>
      <button>Edit</button>
      {this.getInterests()}
    </div>
  </div>
</div>

*/

/* OLDER

<div>
  <div className="content">
    <div className="flex-row">
      <h2>{this.props.currentUser.name}</h2>
    </div>
    <div className="flex-row">
      <h3>{this.props.currentUser.location}</h3>
      <p>{this.props.currentUser.bio}</p>
    </div>
    <div className="flex-row">
      <h3>Groups</h3>
      {
        this.props.currentUser.groups.map(group => (
          <div>{group.name}</div>
        ))
      }
    </div>
  </div>
  <div className="sidebar">
    <div className="flex-row">
      Display Picture
    </div>
    <div className="flex-row">
      <h3>Interests</h3>
      {
        this.props.currentUser.interests.map(interest => (
          <div>{interest}</div>
        ))
      }
    </div>
  </div>
</div>

*/