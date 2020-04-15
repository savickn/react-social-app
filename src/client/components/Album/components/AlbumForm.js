
import React from 'react';
import PropTypes from 'prop-types';

import Profile from '../../Profile/Profile';
import Upload from '../../Upload/components/upload';

import styles from './AlbumForm.scss';

// represents the form used to create Albums
class AlbumForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.nameRef = React.createRef();
    this.descRef = React.createRef();
  }


  // used to upload multiple Pictures
  upload = () => {

  }


  // used to create new Album
  submit = () => {
    const data = {
      name: this.nameRef.target.current.value,
      description: this.descRef.target.current.value, 
    };

    console.log('submit Album --> ', data);
    this.props.handleSubmit(data);
  }
  
  render() {
    return (
      <React.Fragment>
        <div className={styles.upperBlock}>
          <Profile />
          <div className='albumForm'>
            <label htmlFor='name'>Name: </label>
            <input className='form-control' id='name' type='text' ref={this.nameRef} />
            
            <label htmlFor='desc'>Description:</label>
            <textarea className='form-control' id='desc' ref={this.descRef} />
          </div>         
        </div>

        <Upload handleUpload={this.upload} multiple={true}>
          <button className='btn btn-default'>Select Images</button>
        </Upload>

        <button className='btn btn-default' onClick={this.submit}>Upload</button>
      </React.Fragment>
    )
  }
}

AlbumForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired, 
  complete: PropTypes.bool.isRequired, // used to track when Album is created
}

export default AlbumForm;
