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
      distance: 10, // should default to 10 miles
    };
  }

  handleDisplayChange = (type) => {
    console.log('display type', type);
    this.props.changeDisplayType(type);
  }

  handleQueryChange = (se) => {
    this.setState({query: se.target.value});
  }

  handleClearQuery = (se) => {
    this.setState({query: ''});
  }

  handleLocationChange = (location) => {
    this.setState({location: location});
  }

  handleDistanceChange = (distance) => {
    this.setState({distance: distance});
  }

  hasQuery = () => {
    return (this.state.query.length > 0) ? true : false;
  }

  handleSubmit = (se) => {
    if (this.hasQuery()) {
      this.props.search(query);
    }
  };

  render() {
    const hasQuery = this.hasQuery();

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
            <MenuItem eventKey="5">5</MenuItem>
            <MenuItem eventKey="10">10</MenuItem>
            <MenuItem eventKey="25">25</MenuItem>
            <MenuItem eventKey="50">50</MenuItem>
            <MenuItem eventKey="100">100</MenuItem>
          </NavDropdown>
           miles of
          <NavDropdown id='location-dropdown' className={styles['inline']} title={this.state.location} noCaret>
            <MenuItem eventKey="5">5</MenuItem>
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
  search: PropTypes.func.isRequired,
  displayType: PropTypes.string.isRequired,
  changeDisplayType: PropTypes.func.isRequired,
};

export default GroupSearchBar;
