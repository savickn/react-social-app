import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Upload from '../../../Upload/upload';

import { uploadProfileRequest } from '../../../Upload/UploadActions';
import { updateUserRequest } from '../../UserActions';

import { getUploadStatus, getUploadErrors } from '../../../Upload/UploadReducer';
import { getCurrentUser } from '../../AccountReducer';

import noDp from '../../anon_user.png';
import styles from './UserProfilePage.scss';

export class UserProfilePage extends React.Component {



  /* Component logic */

  // update profile picture
  changePhoto = (formData) => {
    /*if(typeof window != undefined) {
      const fr = new FileReader();
      const files = [];
      for(let x of formData.values()) {
        console.log(x);
        files.push(x);
      }

      fr.addEventListener('load', () => {
        console.log('dataurl --> ', fr.result);
        this.setState({altImg: fr.result});
      });
      fr.readAsDataURL(files[0]);
    }*/

    this.props.dispatch(uploadProfileRequest(formData));


    /*axios.post('/api/pictures/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log('userPhoto upload res --> ', res);
      let updatedUser = Object.assign({}, this.props.user, { displayPicture: res.data.picture._id });
      console.log('updatedUser --> ', updatedUser);
      this.props.dispatch(updateUserRequest(updatedUser));
    }).catch((err) => {
      console.log('userPhoto upload err --> ', err);
    })*/
  }

  /* UI logic */

  getDisplayPicture = () => {
    if(!this.props.currentUser.displayPicture || this.props.currentUser.displayPicture.length < 1) return noDp;
    return this.props.currentUser.displayPicture[0];
  }

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
    if(!this.props.currentUser) return <div></div>; // should prob redirect instead

    const dp = this.getDisplayPicture();

    console.log('profilePage props --> ', this.props);
    console.log('profilePage dp --> ', dp);

    return (
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
            <Upload handleUpload={this.changePhoto}>
              <div className={styles.dp}>
                <img src={dp}/>
                <button>Change your photo</button>
              </div>
            </Upload>
          </div>
          <div className={styles.interests}>
            <h2>Interests</h2>
            <button>Edit</button>
            {this.getInterests()}
          </div>
        </div>
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