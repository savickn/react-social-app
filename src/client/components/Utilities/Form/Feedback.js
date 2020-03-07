
import React from 'react';
import PropTypes from 'prop-types';

const statusTypes = ['Success', 'Warning', 'Error'];

export class FeedbackField extends React.Component {
  
  
  render() {
    return <div></div>;
  }
} 

FeedbackField.defaultProps = {
  hidden: true, 
  
};

FeedbackField.propTypes = {
  hidden: PropTypes.bool.isRequired, 
  status: PropTypes.oneOf(statusTypes),
  successMessage: PropTypes.string.isRequired, 
  warningMessage: PropTypes.string.isRequired, 
  errorMessage: PropTypes.string.isRequired, 
};

export default FeedbackField;
