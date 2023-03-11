
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import Moment from 'moment';

import UpvoteControl from '../UpvoteControl';

import styles from './CommentElement.scss';

import noPic from '../../../../shared/missing_avatar.png';


// used to display a single Comment
class CommentComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true, 
      showReplies: false, 
    };
  }

  // used to load long comment histories (e.g. >10 replies) 
  loadCommentTree = () => {
    this.setState({ showReplies: true }, () => {
      this.props.getReplies(this.props.comment._id);
    })
  }

  // upvote this comment
  toggleUpvote = () => {
    const commentId = this.props.comment._id;
    this.props.toggleUpvote(commentId);
  }

  // select this comment to reply to
  handleReply = () => {
    console.log('handleReply');
    this.props.setReply(this.props.comment);
  }

  // embed this comment within CommentForm... NOT WORKING
  handleEmbed = () => {
    console.log('handleEmbed');
    const selection = window.getSelection();
    console.log('selectedText --> ', selection);
  }


  /* UI Methods */

  // used to expand/hide the comment
  toggleVisibility = () => {
    
  }

  // check if comment has replies
  hasReplies = () => {
    return this.props.comment.comments.length > 0;
  }

  // true if replies are loaded
  areRepliesLoaded = () => {
    return this.props.comment.comments[0] instanceof Object; 
  } 

  // used to show/hide replies after loading
  shouldShowReplies = () => {
    return this.state.showReplies;
  }


  showReplies = () => {
    this.setState({ showReplies: true });
  }

  hideReplies = () => {
    this.setState({ showReplies: false });
  }

  render() {
    const { comment, } = this.props;

    const thumbnail = comment.author.profile && comment.author.profile.image ? comment.author.profile.image.path : noPic;

    const hasReplies = this.hasReplies();
    const areRepliesLoaded = this.areRepliesLoaded();
    const showReplies = this.shouldShowReplies();

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
            <div className={`action-text`} onClick={this.handleReply}>Reply</div>
            <div className={`action-text`} onClick={this.handleEmbed}>Embed</div>
            <div className={styles.aux}>
              <div className={styles.date}>{Moment(comment.created_at).fromNow()}</div>
              <div className={styles.likes}>
                <UpvoteControl score={comment.score} hasLiked={this.props.hasLiked} toggleUpvote={this.toggleUpvote} />
              </div>
            </div>
          </div>

          { hasReplies && !areRepliesLoaded ? 
            <div className={`foreground ${styles.replyContainer}`} onClick={this.loadCommentTree}> 
              Load {comment.comments.length} Replies
            </div> : null
          }
          { areRepliesLoaded ? showReplies ?
            <div className={`foreground ${styles.replyContainer}`} onClick={this.hideReplies}> 
              Hide Replies
            </div> 
            : 
            <div className={`foreground ${styles.replyContainer}`} onClick={this.showReplies}> 
              Show Replies
            </div> : null
          }
          { areRepliesLoaded && showReplies ? 
            comment.comments.map((c) => {
              return <CommentComponent comment={c} getReplies={this.props.getReplies}
                hasLiked={this.props.hasLiked} setReply={this.props.setReply}
                toggleUpvote={this.props.toggleUpvote} embedText={this.props.embedText}/>
            }) : null
          }
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
    score: PropTypes.number.isRequired, 
  }).isRequired, 

  //isExpandable: PropTypes.bool.isRequired,
  getReplies: PropTypes.func.isRequired, 

  toggleUpvote: PropTypes.func.isRequired, 
  hasLiked: PropTypes.bool.isRequired, 
  setReply: PropTypes.func.isRequired,
  embedText: PropTypes.func.isRequired, 
};

export default CommentComponent;