
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'


import styles from './UpvoteControl.scss';

// used to upvote/downvote a parent element (e.g. Comment/Post/Picture/etc)
class UpvoteControl extends React.Component {
  render() {
    return (
      <div className={styles.upvoteContainer}>
        <span className='click-cursor' onClick={this.props.handleVote(1)}> <FontAwesomeIcon icon={faThumbsUp} /> </span>
        <span className='click-cursor' onClick={this.props.handleVote(-1)}> <FontAwesomeIcon icon={faThumbsDown} /> </span>
        <span className='score'> {this.props.score} </span>
      </div>
    )
  }
}

UpvoteControl.propTypes = {
  //upvoteCount: PropTypes.number.isRequired,
  //downvoteCount: PropTypes.number.isRequired, 
  score: PropTypes.number.isRequired, 
  handleVote: PropTypes.func.isRequired, 
};

export default UpvoteControl;

 
