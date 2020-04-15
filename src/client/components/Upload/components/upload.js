
import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons';

class UploadComponent extends React.Component {
  
  /* implement checks for 
  *  imgExtension={['.jpg', '.gif', '.png', '.gif']}
  *  maxFileSize={5242880}
  */


  // for upload of individual images
  changeSingle = (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();

    formData.append('avatar', files[0]);

    console.log('uploadElem files --> ', files);
    console.log('uploadElem formData --> ', formData);

    this.props.handleUpload(formData);
  }

  // for upload of multiple images
  changeMultiple = (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    })

    console.log('uploadElem files --> ', files);
    console.log('uploadElem formData --> ', formData);

    this.props.handleUpload(formData);
  }

  /* EVENT HANDLERS */

  // event handler for image change
  handleChange = (e) => {
    this.props.multiple ? this.changeMultiple(e) : this.changeSingle(e);
  }


  /* Render Logic */
  
  render() {
    const icon = this.props.children ? this.props.children : <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' />;

    return (
      <div className='buttons fadein'>
        <div className='button'>
          <label htmlFor='upload' className='click-cursor'>
            {icon}
          </label>
          <input type='file' name='avatar' id='upload' style={{ display: 'none' }} onChange={this.handleChange} multiple={this.props.multiple} /> 
        </div>
    </div>
    );
  }
}

UploadComponent.defaultProps = {
  multiple: false
};

UploadComponent.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  multiple: PropTypes.bool, 
  status: PropTypes.string, // used by parent component to communicate whether or not upload was successful (or if errors occurred)
};

export default UploadComponent;


/*
<div className='buttons fadein'>
  <div className='button'>
    <label htmlFor='single'>
      <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' />
    </label>
    <input type='file' id='single' onChange={this.props.handleUpload} /> 
  </div>
  
  <div className='button'>
    <label htmlFor='multi'>
      <FontAwesomeIcon icon={faImages} color='#6d84b4' size='10x' />
    </label>
    <input type='file' id='multi' onChange={this.props.handleUpload} multiple />
  </div>
</div>
*/