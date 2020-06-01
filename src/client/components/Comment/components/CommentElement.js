
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

import UpvoteControl from '../UpvoteControl';

import styles from './CommentElement.scss';

import noPic from '../../../../shared/missing_avatar.png';


// used to display a single Comment
class CommentComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true, 
    };
  }

  // used to load long comment histories (e.g. >10 replies) 
  loadFullTree = () => {

  }



  /* CHILDREN HANDLERS */

  // used to handle an Upvote or Downvote
  handleVote = () => {
    
  }




  /* UI Methods */

  // used to expand/hide the comment
  toggleVisibility = () => {

  }

  render() {
    const { comment, } = this.props;

    const thumbnail = comment.author.profile.image.path || noPic;

    return (
      <div className={styles.container}>
        <div className='icon'>
          <Image width='50' height='50' src={thumbnail} rounded />
        </div>

        <div className={styles.comment}>
          <div className={`foreground ${styles.content}`}>
            <div className={styles.author}>
              {comment.author.name}
            </div>
            <div className='content'>
              {comment.content}
            </div>
          </div>

          <div className={styles.interactions}>
            <div className={`action-text`}>Reply</div>
            <div className={`action-text`}>Embed</div>
            <div className={styles.aux}>
              <div className={styles.date}>{comment.created_at}</div>
              <div className={styles.likes}>
                <UpvoteControl score={0} handleVote={this.handleVote} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


CommentComponent.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired, 
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    created_at: PropTypes.string.isRequired,
    //score: PropTypes.number.isRequired, 
  }).isRequired, 

  //isExpandable: PropTypes.bool.isRequired,
  getReplies: PropTypes.func.isRequired, 
};

export default CommentComponent;