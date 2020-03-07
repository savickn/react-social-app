import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './GroupCreateWidget.module.scss';

export class GroupCreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
    };
  }

  handleNameChange = (se) => {
    this.setState({name: se.target.value});
  };

  handleLocationChange = (se) => {
    this.setState({location: se.target.value});
  };

  handleSubmit = (se) => {
    //se.preventDefault();
    const {name, location} = this.state;
    //console.log('create --> name, loc, ', name, location);
    if (this.canBeSubmitted()) {
      //console.log('canbeSubmitted');
      this.props.addGroup(name, location);
      this.setState({name: '', location: ''});
    }
  };

  canBeSubmitted = () => {
    const {name, location} = this.state;
    return name.length > 0 && location.length > 0;
  };

  render() {
    //const shouldRender = this.props.shouldRender ? styles['form-container'] : styles['hide-form'];
    const isEnabled = this.canBeSubmitted();
    return (
      <div id="groupForm">
        <h2 className={styles['form-title']}>Create a new group!</h2>
        <div className='form-group'>
          <label htmlFor="name"> Group Name:</label>
          <input type='text' value={this.name} onChange={this.handleNameChange} id="name" className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='location'> Location:</label>
          <input type='text' value={this.location} onChange={this.handleLocationChange} id="location" className='form-control' />
        </div>
        <button className='btn btn-md btn-default' onClick={this.handleSubmit} disabled={!isEnabled}>Add Group</button>
      </div>
    );
  }
}

GroupCreateWidget.propTypes = {
  addGroup: PropTypes.func.isRequired,
  //shouldRender: PropTypes.bool.isRequired,
};

export default GroupCreateWidget;



/*
<div>
        <form name='groupForm' onSubmit={this.handleSubmit}>
          <h2 className={styles['form-title']}>Create a new group!</h2>
          <div className='form-group'>
            <label htmlFor="name"> Group Name:</label>
            <input type='text' value={this.name} onChange={this.handleNameChange} id="name" className='form-control' />
          </div>
          <div className='form-group'>
            <label htmlFor='location'> Location:</label>
            <input type='text' value={this.location} onChange={this.handleLocationChange} id="location" className='form-control' />
          </div>
          <button type='submit' disabled={!isEnabled} className='btn btn-md btn-default' onClick={this.props.addGroup}>Add Group</button>
        </form>
      </div>
      */