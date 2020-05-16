
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import CommentElement from './CommentElement';

import { getComments } from '../CommentReducer';
import { addCommentRequest, searchCommentsRequest } from '../CommentActions';

import { getCurrentUser } from '../../User/AccountReducer';


// can be embedded as child to support commenting (e.g. posting/viewing)
export class CommentHub extends React.Component {

                        /* LIFECYCLE METHODS */

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(searchCommentsRequest(/* parentId */ ));
  }

                        /* EVENT HANDLERS */
  
  createComment = (data) => {
    const comment = {
      author: this.props.currentUser._id, 
      parent: this.props.parentId, 
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
}

function mapStateToProps(state) {
  return {
    comments: getComments(state), 
    currentUser: getCurrentUser(state), 
  }
}

export default connect(mapStateToProps)(CommentHub);
