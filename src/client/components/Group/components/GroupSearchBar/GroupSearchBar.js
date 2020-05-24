import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import styles from './GroupSearchBar.module.scss';
console.log('searchbar styles --> ', styles);

export class GroupSearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      location: 'Toronto, Ontario', // should auto-detect if possible
      distance: 50, // should default to 10 miles
    };
  }

  /* FORM HANDLERS */

  handleQueryChange = (se) => {
    this.setState({query: se.target.value});
  }

  handleClearQuery = (se) => {
    this.setState({query: ''});
  }

  handleLocationChange = (location) => {
    this.setState({location: location}, () => {
      this.props.changeQuery(this.state)
    });
  }

  handleDistanceChange = (distance) => {
    this.setState({distance: distance}, () => {
      this.props.changeQuery(this.state)
    });
  }


  /* EVENT HANDLERS */

  handleDisplayChange = (type) => {
    console.log('display type', type);
    this.props.changeDisplayType(type);
  };

  handleSubmit = (se) => {
    if (this.hasQuery()) {
      this.props.search(query);
    }
  };

  /* RENDER LOGIC */

  hasQuery = () => {
    return (this.state.query.length > 0) ? true : false;
  }

  // converts OSM location object to String
  parseLocation = () => {
    const { address } = this.props;
    return address ? `${address.city}, ${address.state}` : '';
  }

  render() {
    const hasQuery = this.hasQuery();
    const location = this.parseLocation();

    return (
      <div className={styles['flex-search-bar']}>
        <div className={`inner-addon right-addon`}>
          {
            hasQuery ?
            <i className='glyphicon glyphicon-search' onClick={this.handleSubmit}></i> :
            <i className='glyphicon glyphicon-remove' onClick={this.handleClearQuery}></i>
          }
          <input type='search' className={`form-control`} onChange={this.handleQueryChange} value={this.state.query} />
        </div>
        <div className={styles['location-input']}>
           within
          <NavDropdown id='distance-dropdown' className={styles['inline']} title={this.state.distance} activeKey={this.state.distance} onSelect={this.handleDistanceChange} noCaret>
            <MenuItem eventKey="10">10</MenuItem>
            <MenuItem eventKey="25">25</MenuItem>
            <MenuItem eventKey="50">50</MenuItem>
            <MenuItem eventKey="500">500</MenuItem>
          </NavDropdown>
           kilometers of
          <NavDropdown id='location-dropdown' className={styles['inline']} title={location} noCaret>
            <MenuItem eventKey="5"> Not Your Location? </MenuItem>
          </NavDropdown>
        </div>
        <div className={styles['toggle-display-type']}>
          <Nav bsStyle="pills" activeKey={this.props.displayType} onSelect={this.handleDisplayChange}>
            <NavItem eventKey='Groups'>Groups</NavItem>
            <NavItem eventKey='Calender'>Calender</NavItem>
          </Nav>
        </div>
      </div>
    );
  }
}

GroupSearchBar.propTypes = {
  address: PropTypes.object.isRequired, 

  search: PropTypes.func.isRequired,
  displayType: PropTypes.string.isRequired,
  changeDisplayType: PropTypes.func.isRequired,
  changeQuery: PropTypes.func.isRequired, 
};

export default GroupSearchBar;
