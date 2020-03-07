
import React from 'react';
import PropTypes from 'prop-types';

class InnerWizardComponent extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.content}</h3>
        <button onClick={this.props.callback}>Click Me</button>
      </div>
    );
  }
}

InnerWizardComponent.propTypes = {
  callback: PropTypes.func,
  content: PropTypes.string, 
}

export default InnerWizardComponent;
