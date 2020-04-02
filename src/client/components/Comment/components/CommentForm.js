
import React from 'react';
import PropTypes from 'prop-types';

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
    return (
      <React.Fragment>
        <div>button to show/hide form</div>
        <div> 
          <label>Comment:</label>
          <input type='text' ref={this.contentRef} className='form-control'/>
        </div>
        <button onClick={this.createComment}> Create </button>
      </React.Fragment>
    );
  }
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired, 
};

export default CommentForm;

