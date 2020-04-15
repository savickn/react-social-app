
import React from 'react';
import PropTypes from 'prop-types';

import UpvoteControl from '../UpvoteControl';

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
    const comment = this.props.comment;

    return (
      <div className='comment'>
        <div className='author'>
          Author name... created when
        </div>
        <div className='content'>
          {comment.content}
        </div>
        <div className='controls'>
          reply
          embed
          <UpvoteControl score={0} handleVote={this.handleVote} />
        </div>
      </div>
    )
  }
}


CommentComponent.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired, 
    //score: PropTypes.number.isRequired, 
  }).isRequired, 

  //isExpandable: PropTypes.bool.isRequired,


};

export default CommentComponent;