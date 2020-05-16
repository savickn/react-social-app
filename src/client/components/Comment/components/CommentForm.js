
import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, } from '@fortawesome/free-solid-svg-icons'
import { Image } from 'react-bootstrap';

import styles from './CommentForm.scss';

import noPic from '../../../../shared/missing_avatar.png';

// comment creator
class CommentForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false, 
    };

    this.contentRef = React.createRef();
  }

  // used to show/hide form
  toggleForm = () => {
    this.setState({visible: !this.state.visible});
  }

  // used to validate form before sending POST request
  validateForm = () => {

  }

  // dispatch POST request to create Comment
  createComment = (e) => {
    const comment = {
      content: this.contentRef.current.value, 
    };
    this.props.handleSubmit(comment);
  }
  
  render() {
    const thumbnail = this.props.userImg || noPic;

    return (
      <div className={styles.commentContainer}>
        { /* <div> OPTIONAL button to show/hide form</div> */ }

        <div className='icon'>
          <Image width='50' height='50' src={thumbnail} rounded />
        </div>
        <textarea className='form-control' ref={this.contentRef} placeholder='Comment...'/>
        <div className='click-cursor' onClick={this.createComment}>
          <FontAwesomeIcon icon={faPlay} size={"2x"} />
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired, 
  userImg: PropTypes.string, 
};

export default CommentForm;

