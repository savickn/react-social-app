import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { debounce } from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import styles from './GroupSearchBar.scss';
//console.log('searchbar styles --> ', styles);


export class GroupSearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      location: 'Toronto, Ontario', // should auto-detect if possible
      distance: 50, // should default to 10 miles
      dropdownState: false, 
      changeLocation: false, 
    };
  }

  componentDidMount() {
    this.props.clearSuggestions();
  }

                          /* FORM HANDLERS */

  // change search text

  handleQueryChange = (se) => {
    this.setState({ query: se.target.value });
  }

  handleClearQuery = (se) => {
    this.setState({ query: ''} );
  }

  handleLocationChange = (location) => {
    this.setState({ location: location }, () => {
      this.props.changeQuery(this.state)
    });
  }

  handleDistanceChange = (distance) => {
    this.setState({ distance: distance }, () => {
      this.props.changeQuery(this.state)
    });
  }


  /* EVENT HANDLERS */

  handleDisplayChange = (type) => {
    console.log('display type', type);
    this.props.changeDisplayType(type);
  };

  handleSubmit = (se) => {
    this.props.search({ 
      query: this.state.query,
      distance: this.state.distance,
    });
    //if (this.hasQuery()) {}
  };

  // open manual location form... why does e.stopPropagation not work here??
  changeMyLocation = (e) => {
    //console.log(e);
    //e.preventDefault();
    //e.stopPropagation();

    this.setState({ changeLocation: true });
  }

  // used to manually change your location (if not auto-detected/etc)
  handleMyLocChange = debounce((loc) => {
    //console.log('handleloc --> ', loc);
    this.props.getSuggestions(loc);
  }, 1000)


  /* DROPDOWN LOGIC */

  toggleDropdown = (state) => {
    this.setState({ dropdownState: state });
  }

  // lazy hack
  stopDropdownSelect = (e) => {
    e.preventDefault();
  }

  selectLocation = (loc) => {
    //console.log(loc);
    this.props.changeAddress(loc);
  }


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
    const { dropdownState, changeLocation } = this.state;
    const { suggestions } = this.props;

    const hasQuery = this.hasQuery();
    const location = this.parseLocation();

    return (
      <div className={styles['flex-search-bar']}>
        
        { /*
        <div className={`${styles.textSearch} inner-addon right-addon`}>
          {
            hasQuery ?
            <i className='glyphicon glyphicon-search' onClick={this.handleSubmit}></i> :
            <i className='glyphicon glyphicon-remove' onClick={this.handleClearQuery}></i>
          }
          <input type='search' className={`form-control`} onChange={this.handleQueryChange} value={this.state.query} />
        </div>
        */ }

        <div className={styles.searchBtn} onClick={this.handleSubmit}>
          <FontAwesomeIcon icon={faSearch} /> 
        </div>


        { /* add 'x' FontAwesome button} */ }

        <input type='search' name='search' onChange={this.handleQueryChange} value={this.state.query}
          placeholder='Text Search' className={`${styles.searchInput}`} aria-describedby='basic-addon1' />

        <div className={styles['location-input']}>
           within
          <NavDropdown id='distance-dropdown' className={styles['inline']} title={this.state.distance} activeKey={this.state.distance} 
              onSelect={this.handleDistanceChange} noCaret>
            <MenuItem eventKey="10">10</MenuItem>
            <MenuItem eventKey="25">25</MenuItem>
            <MenuItem eventKey="50">50</MenuItem>
            <MenuItem eventKey="500">500</MenuItem>
          </NavDropdown>
           kilometers of
          <NavDropdown id='location-dropdown' className={styles['inline']} title={location} 
            defaultOpen={dropdownState} onSelect={this.stopDropdownSelect} noCaret >
            <MenuItem eventKey="5" onClick={this.changeMyLocation}> Change Your Location? </MenuItem>
            { changeLocation && 
              <MenuItem>
                <input type='text' className='form-control' onChange={(e) => this.handleMyLocChange(e.target.value)} />
              </MenuItem> 
            }
            { suggestions.map(loc => {
                return <MenuItem onSelect={() => this.selectLocation(loc)}>{loc.display_name}</MenuItem>
              })
            }
          </NavDropdown>
        </div>
      </div>
    );
  }
}

GroupSearchBar.propTypes = {
  address: PropTypes.object.isRequired, 
  changeAddress: PropTypes.func, 

  displayType: PropTypes.string.isRequired,
  changeDisplayType: PropTypes.func.isRequired,
  
  search: PropTypes.func.isRequired,
  changeQuery: PropTypes.func.isRequired, 

  suggestions: PropTypes.array, 
  getSuggestions: PropTypes.func, 
  clearSuggestions: PropTypes.func, 
};

export default GroupSearchBar;

/*
        <div className={styles['toggle-display-type']}>
          <Nav bsStyle="pills" activeKey={this.props.displayType} onSelect={this.handleDisplayChange}>
            <NavItem eventKey='Groups'>Groups</NavItem>
            <NavItem eventKey='Calender'>Calender</NavItem>
          </Nav>
        </div>
        */
