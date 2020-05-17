
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from '../../util/axiosCaller';

import Upload from '../Upload/components/upload';

import { uploadRequest } from '../Upload/UploadActions';
import { fetchProfileRequest, createProfileRequest, } from './ProfileActions';
import { getProfileById } from './ProfileReducer';

import noPic from './anon_user.png';
import styles from './Profile.scss';

// an embeddable Component used to display/change a Profile picture
// ... add support to choose picture from list of recent pictures
class Profile extends React.Component {

                      /* LIFECYCLE LOGIC */

  constructor(props) {
    super(props);
    this.state = {
      id: null, 
    };
  }

  // send GET request for Profile
  componentDidMount() {
    if(this.props.profileId) {
      this.props.dispatch(fetchProfileRequest(this.props.profileId));
    }
  }

                      /* API Requests */

  // used to upload a new Profile picture
  createProfile = async (formData) => {
    for(let [k, v] of formData.entries()) {
      console.log(k, ' --- ', v);
    }

    const profile = {
      imageableId: this.props.imageableId,
      imageableType: this.props.imageableType, 
    };

    this.props.dispatch(createProfileRequest(profile, formData));
  }

                      /*  RENDER LOGIC */

  // used to determine which image to show (e.g. Profile vs. preview vs. default)
  getPic = () => {
    const { profile, preview, } = this.props;

    if(profile) {
      return profile.image.path;
    } else if(preview) {
      return preview;
    } else {
      return noPic;
    }
  }

  render() {
    const dp = this.getPic();

    return (
      <React.Fragment>
        <Upload handleUpload={this.createProfile} multiple={false}>
          <div>
            <img src={dp} width='150' height='150' />
          </div>
        </Upload>
      </React.Fragment>
    )
  }
}

Profile.propTypes = {
  // default: path --> add option for different default images
  preview: PropTypes.string, 

  profileId: PropTypes.string.isRequired,
  // createProfile: PropTypes.func.isRequired, // --> used to create Profile if not exists 
  imageableId: PropTypes.string.isRequired, 
  imageableType: PropTypes.string.isRequired, //e.g. Group, User  
};

function mapStateToProps(state, props) {
  return {
    profile: getProfileById(state, props.profileId),
  }
}

export default connect(mapStateToProps)(Profile);


/* to show image on client-side
if(typeof window != undefined) {
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
}
*/

  // creates Profile if not exists
  /*createProfile = async () => {
    const { imageableId, imageableType, } = this.props;
    return axios.post('/api/profiles/', { imageableId, imageableType })
      .then(res => res.data).then(async res => {
        console.log('createProfile res --> ', res);
        await this.setState({ id: res.profile._id })
      })
      .catch(err => { 
        console.log('createProfile err --> ', err);
        throw err; 
      })
  }*/

// OLD IMAGE UPLOAD
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