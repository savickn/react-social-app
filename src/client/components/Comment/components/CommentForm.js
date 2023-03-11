
import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
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
    this.contentRef.current.value = '';
  }

  getReplyText = () => {
    const { reply } = this.props;
    return `Replying to ${reply.author.name}: "${reply.content.slice(0, 50)}"`;
  }

  
  render() {
    const thumbnail = this.props.userImg || noPic;

    return (
      <div className={styles.commentContainer}>
        { /* <div> OPTIONAL button to show/hide form</div> */ }

        <div className='icon'>
          <Image width='50' height='50' src={thumbnail} rounded />
        </div>
        
        <div className={styles.commentBox}>
          <textarea className='form-control vert-resize-only' ref={this.contentRef} 
            placeholder='Comment...' resize='vertical'/>
          { this.props.reply ? 
            <p>
              {this.getReplyText()}
              <FontAwesomeIcon icon={faTimes} onClick={this.props.cancelReply}
                className='left-margin'/>
            </p>
            : null
          }  
        </div>

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
  reply: PropTypes.object, 
  cancelReply: PropTypes.func, 
};

export default CommentForm;

