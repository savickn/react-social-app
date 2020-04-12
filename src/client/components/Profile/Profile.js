
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from '../../util/axiosCaller';

import Upload from '../Upload/components/upload';

import { uploadRequest } from '../Upload/UploadActions';
import { fetchProfileRequest } from './ProfileActions';
import { getProfileById } from './ProfileReducer';

import noDp from './anon_user.png';
import styles from './Profile.scss';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null, 
    };
  }

  componentDidMount() {
    if(this.props.profileId) {
      this.props.dispatch(fetchProfileRequest(this.props.profileId));
    }
  }

  /* API Requests */

  // creates Profile if not exists
  createProfile = async () => {
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
  }

  // used to upload a new Profile picture
  changePhoto = async (formData) => {

    // create Profile if necessary
    if(!this.props.profile) {
      try {
        await this.createProfile();
      } catch(err) {
        console.log('Unable to create Profile! Please try again!'); 
        return;
      }
    }

    const parentId = this.props.profileId || this.state.id;
    
    formData.append('parentId', parentId);
    formData.append('parentType', 'Profile');

    this.props.dispatch(uploadRequest(formData));
  }

  /* Render logic */

  render() {
    const { profile } = this.props;
    const dp = profile ? profile.image.path : noDp;

    return (
      <React.Fragment>
        <Upload handleUpload={this.changePhoto}>
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