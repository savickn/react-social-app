
import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons';

class UploadComponent extends React.Component {
  
  /* implement checks for 
  *  imgExtension={['.jpg', '.gif', '.png', '.gif']}
  *  maxFileSize={5242880}
  */

  constructor(props) {
    super(props);
    this.state = {};
    //this.uploadRef = React.createRef();

    console.log('upload props --> ', props);
  }

  /* COMPONENT LOGIC */

  // for upload of individual images
  changeSingle = (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();

    formData.append('avatar', files[0]);

    console.log('uploadElem files --> ', files);

    this.props.handleUpload(formData);
  }

  // for upload of multiple images
  changeMultiple = (e) => {
    const files = Array.from(e.target.files);
    //const files = this.uploadRef.current.target.files;
    //console.log(this.uploadRef.current);

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(`image${i}`, file);
    })

    console.log('uploadElem files --> ', files);

    this.props.handleUpload(formData);
  }

  /* EVENT HANDLERS */

  // event handler for image change
  handleChange = (e) => {
    this.props.multiple ? this.changeMultiple(e) : this.changeSingle(e);
  }
  

  render() {
    const { _id_, children, multiple, } = this.props;
    const icon = children ? children : <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' />;

    return (
      <div className='buttons fadein'>
        <div className='button'>
          <label htmlFor={_id_} className='click-cursor'>
            {icon}
          </label>
          
          {/*
          <input type='file' name='avatars[]' id='upload' style={{ display: 'none' }} 
            ref={this.uploadRef} onChange={this.handleChange} multiple /> 
          */}

                    
          {multiple ? 
            <input type='file' name='avatars[]' id={_id_} style={{ display: 'none' }} onChange={this.handleChange} multiple={multiple} /> 
            : 
            <input type='file' name='avatar' id={_id_} style={{ display: 'none' }} onChange={this.handleChange} />
          }
        </div>
      </div>
    );
  }
}

UploadComponent.defaultProps = {
  _id_: 'upload', 
  multiple: false,
}


UploadComponent.propTypes = {
  _id_: PropTypes.string.isRequired, // used to differentiate between multiple Upload components on one page
  handleUpload: PropTypes.func.isRequired,
  multiple: PropTypes.bool.isRequired, 
  status: PropTypes.string, // used by parent component to communicate whether or not upload was successful (or if errors occurred)
};

export default UploadComponent;


/*
  getInputType = () => {
    return this.props.multiple ? 
      <input type='file' name='avatars[]' id='upload' style={{ display: 'none' }} onChange={this.handleChange} multiple /> : 
      <input type='file' name='avatar' id='upload' style={{ display: 'none' }} onChange={this.handleChange} />
  }
  */

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