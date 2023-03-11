
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import styles from './GroupCreateWidget.scss';

export class GroupCreateWidget extends Component { 
  constructor(props) { 
    super(props);
    this.state = { 
      name: '',
      location: { 
        display_name: '', 
      },
    };
  }

  componentDidMount() {
    this.props.clearSuggestions(); // to clear suggestions from other components
  }

                              /* EVENT HANDLERS */

  // change 'name' input value
  handleNameChange = (se) => {
    this.setState({ name: se.target.value });
  };

  // used to refresh location suggestions when query is changed
  handleLocationChange = debounce((location) => {
    this.props.getSuggestions(location);
  }, 500);

  // used to select a location in the search form
  selectLocation = (loc) => {
    this.setState({ location: loc }, () => { 
      //this.props.clearSuggestions();
    });
  };

  // submit form to create group
  handleSubmit = (se) => {
    const { name, location } = this.state;

    if(this.canBeSubmitted()) {
      this.props.addGroup(name, location);
    }
  };

                              /* RENDER LOGIC */
                            

  canBeSubmitted = () => {
    const { name, location } = this.state;
    return name.length > 0 && location.display_name.length > 0;
  };

  render() {
    const { location, name, } = this.state;
    
    //const shouldRender = this.props.shouldRender ? styles['form-container'] : styles['hide-form'];
    const isEnabled = this.canBeSubmitted();

    //const locationString = location.address ? `${location.display_name.split(', ')[0]}, ${location.address.state}, ${location.address.country}`: '';

    return (
      <div id="groupForm" className={styles.groupForm}>
        <div className='form-group'>
          <label htmlFor="name"> Group Name:</label>
          <input type='text' value={name} onChange={this.handleNameChange} id="name" className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='location'> Location:</label>
          <input type='text' onChange={(e) => this.handleLocationChange(e.target.value)} id="location" className='form-control' />
        </div>
        {this.props.locationSuggestions.map((loc, idx) => {
          return (
            <div 
              className={`${styles.suggestion} ${this.state.location.place_id === loc.place_id ? styles.selected : ''}`} 
              onClick={() => this.selectLocation(loc)}>
                {loc.display_name}
            </div>
          );
        })}
        <div className={styles.centerBtn}>
          <button className='btn btn-md btn-default' onClick={this.handleSubmit} disabled={!isEnabled}>Add Group</button>
        </div>
      </div>
    );
  }
}

GroupCreateWidget.propTypes = {
  //shouldRender: PropTypes.bool.isRequired,
  addGroup: PropTypes.func.isRequired,

  getSuggestions: PropTypes.func.isRequired, // func to query osm for suggestions when user input changes
  clearSuggestions: PropTypes.func.isRequired,
  locationSuggestions: PropTypes.array.isRequired, // an array of osm objects
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
