
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import styles from './GroupCreateWidget.scss';

export class GroupCreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
    };
  }

  /* OTHER */

  // used to auto-complete location using OSM after a delay
  locationLookup = () => {
    console.log('location lookup');

    const { location } = this.state;

    
  }

  /* EVENT HANDLERS */

  handleNameChange = (se) => {
    this.setState({name: se.target.value});
  };

  handleLocationChange = debounce((location) => {
    this.setState({location}, () => {
      this.locationLookup();
    })
  }, 500);

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

  /* RENDER LOGIC */

  canBeSubmitted = () => {
    const {name, location} = this.state;
    return name.length > 0 && location.length > 0;
  };

  render() {
    //const shouldRender = this.props.shouldRender ? styles['form-container'] : styles['hide-form'];
    const isEnabled = this.canBeSubmitted();
    return (
      <div id="groupForm">
        <div className='form-group'>
          <label htmlFor="name"> Group Name:</label>
          <input type='text' value={this.name} onChange={this.handleNameChange} id="name" className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='location'> Location:</label>
          <input type='text' value={this.location} onChange={(e) => this.handleLocationChange(e.target.value)} id="location" className='form-control' />
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