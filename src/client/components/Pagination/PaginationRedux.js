import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getCollectionById } from './PaginationReducer';

export class Pagination extends Component {

  constructor() {
    super();
    this.state = {

    };
  }

  updateCollectionPagination() {
    //this.props.dispatch({type: 'CHANGE_PAGE', payload: {id: this.props.collectionId, selectedPage}});
  }

  pageChange = (selectedPage) => {
    this.props.dispatch({type: 'CHANGE_PAGE', payload: {id: this.props.collectionId, selectedPage}});

  }

  sizeChange = (pageSize) => {

  }


  render() {
    console.log('pagination props --> ', this.props);
    const pageCount = Math.ceil(this.props.collectionSize / this.props.pageSize)
    const nums = Array.from(Array(pageCount).keys());
    console.log('pageCount --> ', pageCount);
    console.log('nums --> ', nums);

    return (
      <div>
        <Nav bsStyle='pills' activeKey={this.props.currentPage}>
          <NavItem key={0} onSelect={() => this.handlePageChange(this.props.currentPage - 1)}><i className='glyphicon glyphicon-chevron-left'></i></NavItem>
          {
            nums.map((num) => {
              return (<NavItem key={num + 1} eventKey={num + 1} onSelect={this.handlePageChange}>{num + 1}</NavItem>);
            })
          }
          <NavItem key={pageCount + 1} onSelect={() => this.handlePageChange(this.props.currentPage + 1)}><i className='glyphicon glyphicon-chevron-right'></i></NavItem>
        </Nav>
        <Nav bsStyle='pills'> 
          <NavDropdown title={`Items per page`} id="nav-dropdown" activeKey={this.props.pageSize} onSelect={this.handleSizeChange}>
            <MenuItem eventKey="5">5</MenuItem>
            <MenuItem eventKey="10">10</MenuItem>
            <MenuItem eventKey="25">25</MenuItem>
            <MenuItem eventKey="50">50</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

Pagination.defaultProps = {

};

Pagination.propTypes = {
  collectionId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    collection: getCollectionById(state, props.collectionId),
  };
}

export default connect(mapStateToProps)(Pagination);
