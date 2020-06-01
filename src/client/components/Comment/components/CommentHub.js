
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import CommentElement from './CommentElement';

import { getComments } from '../CommentReducer';
import { addCommentRequest, searchCommentsRequest } from '../CommentActions';

import { getCurrentUser } from '../../User/AccountReducer';


// can be embedded as child to support commenting (e.g. on Event or Group)
export class CommentHub extends React.Component {

                        /* LIFECYCLE METHODS */

  constructor(props) {
    super(props);
    this.state = {};
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

                        /* CREATE COMMENT */
  
  createComment = (data) => {
    const comment = {
      author: this.props.currentUser._id, 
      parent: this.props.parentId, 
      parentType: data.parentType || this.props.parentType,
      content: data.content,
    }
    console.log('createComment --> ', comment);
    this.props.dispatch(addCommentRequest(comment));
  }

                        /* RENDER LOGIC */

  render() {
    const { comments } = this.props;

    return (
      <div>
        { comments && comments.map((comment) => {
          return <CommentElement key={comment._id} comment={comment} />
        })}
        <CommentForm handleSubmit={this.createComment} />
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
