import React from 'react';
import PropTypes from 'prop-types';

const defaultState = {
  name: '',
  //add thumbnail
  //add permissions
};

// represents a two-step form (first create album, then optionally add pictures)
class CreateAlbumWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  /* event handlers */ 

  handleNameChange = (se) => {
    this.setState({name: se.target.value});
  };

  handleSubmit = (se) => {
    console.log('form submitted --> ', this.state);
    se.preventDefault(); // prevents page redirect
    if (this.canBeSubmitted()) {
      this.props.createAlbum(this.state);
      this.setState(defaultState);
    }
  };

  /* validations */

  canBeSubmitted = () => {
    const { name } = this.state;
    return name.length > 0 && this.props.imageableId && this.props.imageableType && this.props.authorId;
  };

  render() {
    return (
      <form id="groupForm" onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor="name"> Album Name:</label>
          <input type='text' value={this.name} onChange={this.handleNameChange} id="name" className='form-control' />
        </div>
        

        <button type="submit" className='btn btn-md btn-default'>Create Album</button>
      </form>
    );
  }
}

CreateAlbumWidget.defaultProps = {
  submitMode: 'button', // can be 'button' or 'select'
};

CreateAlbumWidget.propTypes = {
  imageableId: PropTypes.string.isRequired,
  imageableType: PropTypes.string.isRequired, 
  createAlbum: PropTypes.func.isRequired,
  submitMode: PropTypes.string.isRequired, 
};

export default CreateAlbumWidget;
