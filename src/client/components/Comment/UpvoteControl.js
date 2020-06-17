
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { debounce } from 'lodash';

import styles from './UpvoteControl.scss';

// used to upvote/downvote a parent element (e.g. Comment/Post/Picture/etc)
class UpvoteControl extends React.Component {

  toggleUpvote = debounce(() => {
    console.log('toggle Upvote');
    this.props.toggleUpvote();
  }, 300)

  render() {
    return (
      <div className={styles.upvoteContainer}>
        { this.props.hasLiked ?   
          <span className='click-cursor' onClick={this.toggleUpvote}> <FontAwesomeIcon icon={faThumbsUp} color='blue' /> </span>
          :
          <span className='click-cursor' onClick={this.toggleUpvote}> <FontAwesomeIcon icon={faThumbsUp} /> </span>
        }

        { /* <span className='click-cursor' onClick={this.props.handleVote(-1)}> <FontAwesomeIcon icon={faThumbsDown} /> </span> */ }
        <span className='score'> {this.props.score} </span>
      </div>
    )
  }
}

UpvoteControl.propTypes = {
  toggleUpvote: PropTypes.func.isRequired, 
  hasLiked: PropTypes.bool.isRequired, 
  score: PropTypes.number.isRequired,  
};

export default UpvoteControl;
