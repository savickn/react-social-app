
import React from 'react';
import PropTypes from 'prop-types';

import Profile from '../../Profile/Profile';
import Upload from '../../Upload/components/upload';

import { readFileAsync } from '../../../util/utilFuncs';

import noPic from '../../../../shared/no-image-icon.png';

import styles from './AlbumForm.scss';

// represents the form used to create Albums
class AlbumForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}, 
      images: [], 
      formData: null, 
    };

    this.nameRef = React.createRef();
    this.descRef = React.createRef();
  }

  // used to select Profile image 
  handleSelectProfile = () => {

  }

  // used to select content Images
  handleSelectImages = async (formData) => {
    const images = [];

    for(let v of formData.values()) {
      if(v instanceof File) {
        let dUrl = await readFileAsync(v);
        images.push({
          dataUrl: dUrl,
          file: v, 
        });
      }
    }

    this.setState({
      images, 
      formData, 
    })
  }

  // used to select an Image as the Profile
  setAsProfile = (image) => {
    let formData = this.state.formData;

    this.setState({
      profile: image,
      formData,  
    })
  }


  // used to create new Album
  submit = () => {
    const data = {
      name: this.nameRef.current.value,
      description: this.descRef.current.value, 
      images: this.state.images, 
      profile: this.state.profile, 
    };

    this.props.handleSubmit(data);
  }

  /* RENDER LOGIC */
  
  render() {
    const { images, profile, } = this.state;

    const preview = profile.dataUrl || noPic;

    return (
      <React.Fragment>
        <div className={styles.upperBlock}>
          {/* ALBUM PROFILE PIC */}
          <img src={preview} width='150' height='150'/>

          {/* ALBUM INFO */}
          <div className='albumForm'>
            <label htmlFor='name'>Name: </label>
            <input className='form-control' id='name' type='text' ref={this.nameRef} />
            
            <label htmlFor='desc'>Description:</label>
            <textarea className='form-control' id='desc' ref={this.descRef} />
          </div>
        </div>

        {/* ALBUM IMAGES */}
        <Upload _id_={'albumImages'} handleUpload={this.handleSelectImages} multiple={true}>
          <div className='btn btn-default'>Select Images</div>
        </Upload>
        <div className='previewMultiple'>
          { images.map((i) => {
            return <img src={i.dataUrl} height='50' width='50' onClick={() => this.setAsProfile(i)} />
          })}
        </div>

        {/* SUBMIT BTN */}
        <button className='btn btn-default' onClick={this.submit}>Upload</button>
      </React.Fragment>
    )
  }
}

AlbumForm.propTypes = {
  // uploadImages: cb
  // createProfile: cb
  // createAlbum: cb

  handleSubmit: PropTypes.func.isRequired, 
  complete: PropTypes.bool.isRequired, // used to track when Album is created
}

export default AlbumForm;
