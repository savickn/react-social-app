import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export class Pagination extends Component {
  constructor() {
    super();
  }

  handlePageChange = (selectedPage) => {
    console.log('selectedPage', selectedPage);
    this.props.changePage(selectedPage);
  }

  handleSizeChange = (pageSize) => {
    console.log('pageSize', pageSize);
    this.props.changeSize(pageSize);
  }

  render() {
    var numArr = [];
    var pageCount = Math.ceil(this.props.collectionSize / this.props.pageSize);
    for(var i = 1; i <= pageCount; i++) {
      numArr.push(i);
    }

    return (
      <div>
        <Nav bsStyle='pills' activeKey={this.props.currentPage} onSelect={this.handlePageChange}>
          {
            numArr.map((num, idx) => {
              return (<NavItem key={idx} eventKey={num}>{num}</NavItem>);
            })
          }
        </Nav>
        <Nav bsStyle='pills'>
          <NavDropdown title="Items per page" id="nav-dropdown" activeKey={this.props.pageSize} onSelect={this.handleSizeChange}>
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

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  collectionSize: PropTypes.number.isRequired,
  changeSize: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Pagination;
