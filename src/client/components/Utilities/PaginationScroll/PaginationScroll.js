import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class PaginationScroll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nextReady: false, 
      loading: false, 
    };
  }

  //
  load = () => {
    this.props.loadMore(this.props.pageSize, this.props.loadedCount);
  }

  // used to preload next results
  preLoadNext = () => {

  }

  // used to display next results
  displayNext = (se) => {

  }

  render() {
    console.log('paginationScroll props --> ', this.props);

    return (
      <button className='btn btn-md btn-default' onClick={this.load}> Show More </button>
    );
  }
}

PaginationScroll.defaultProps = {
  pageSize: 10,
};

PaginationScroll.propTypes = {
  pageSize: PropTypes.number.isRequired,
  collectionSize: PropTypes.number.isRequired, 
  loadedCount: PropTypes.number.isRequired, 

  loadMore: PropTypes.func.isRequired, 
  preload: PropTypes.bool, 
};


export default PaginationScroll;
