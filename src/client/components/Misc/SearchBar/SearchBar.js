import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SearchBar.css';

export class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    };
  }

  handleQueryChange = (se) => {
    this.setState({query: se.target.value});
  }

  handleSubmit = (se) => {
    const {query} = this.state;
    if (query.length > 0) {
      this.props.search(query);
    }
  };

  render() {
    return (
      <div className='form-group'>
        <input type='search' value={this.query} onChange={this.handleQueryChange} className='form-control' />
        <button onClick={this.handleSubmit} className='btn btn-md btn-default'>Search</button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
};

export default SearchBar;
