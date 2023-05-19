
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import CommentElement from './CommentElement';

import { getComments } from '../CommentReducer';
import { addCommentRequest, searchCommentsRequest, toggleUpvoteRequest, fetchCommentRequest, } from '../CommentActions';

import { getCurrentUser } from '../../User/AccountReducer';

import styles from './CommentHub.scss';

import noPic from '../../User/anon_user.png';

// can be embedded as child to support commenting (e.g. on Event or Group)
export class CommentHub extends React.Component {

                        /* LIFECYCLE METHODS */

  constructor(props) {
    super(props);
    this.state = {
      reply: null
    };
  }

  componentDidMount() {
    const { parentId } = this.props;
    this.searchComments(parentId);
  }

                        /* SEARCH COMMENTS */

  // dispatch AJAX request to API
  searchComments(parentId) {
    this.props.dispatch(searchCommentsRequest({ parent: parentId }));
  }

  // fetch one Comment in full detail
  fetchComment = (id) => {
    this.props.dispatch(fetchCommentRequest(id));
  }

                        /* CREATE COMMENT */
  
  // create a new Comment
  createComment = (data) => {
    const { reply } = this.state;
    const { parentId, parentType } = this.props;

    const comment = {
      author: this.props.currentUser._id, 
      content: data.content,
    }

    comment.parent = reply ? reply._id : parentId, 
    comment.parentType = reply ? "Comment" : parentType,

    console.log('createComment --> ', comment);
    this.props.dispatch(addCommentRequest(comment));
    this.clearReply();
  }

  // used to select which comment to reply to
  setReply = (commentId) => {
    const reply = this.props.comments.filter(c => c._id === commentId)[0];
    this.setState({ reply });
  }

  clearReply = () => {
    this.setState({ reply: null });
  }

  // used to quote another user's comment
  embedText = () => {

  }

                        /* UPVOTE */

  toggleUpvote = (commentId) => {
    const authorId = this.props.currentUser._id;
    this.props.dispatch(toggleUpvoteRequest(commentId, authorId));
  }

  // determines if currentUser has liked a particular comment
  hasLiked = (comment) => {
    const { currentUser } = this.props;
    /*console.log('hasLiked string --> ', currentUser._id.toString());
    console.log('hasLiked id --> ', currentUser._id);
    console.log('hasLiked typeof --> ', typeof currentUser._id);*/
    console.log('c --> ', comment);
    console.log(currentUser._id);
    
    return comment.upvotes.filter(uv => {
      let authorId = uv.author._id || uv.author;
      return authorId === currentUser._id;
    }).length > 0;
  }


                        /* RENDER LOGIC */

  render() {
    const { comments, currentUser } = this.props;
    const myImg = currentUser.profile ? currentUser.profile.image.path : noPic;
    console.log('state --> ', this.state);

    return (
      <div className={styles.commentHub}>
        { comments && comments.map((comment) => {
          const hasLiked = this.hasLiked(comment);
          return <CommentElement key={comment._id} comment={comment} setReply={this.setReply} embedText={this.embedText} 
            toggleUpvote={this.toggleUpvote} hasLiked={hasLiked} getReplies={this.fetchComment} />
        })}
        <CommentForm handleSubmit={this.createComment} userImg={myImg} 
          reply={this.state.reply} cancelReply={this.clearReply} />
      </div>
    )
  }
}

CommentHub.propTypes = {
  parentId: PropTypes.string.isRequired, 
  parentType: PropTypes.string.isRequired, 
}

function mapStateToProps(state, props) {
  return {
    comments: getComments(state, props.parentId), 
    currentUser: getCurrentUser(state), 
  }
}

export default connect(mapStateToProps)(CommentHub);
