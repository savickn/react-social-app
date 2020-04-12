import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem } from 'react-bootstrap';

import Profile from '../../../Profile/Profile';

class GroupBanner extends React.Component {

  render() {
    return (
      <div>
        <div className='col1'>
          <Profile profileId={this.props.profileId} imageableId={this.props.groupId} imageableType='Group' />
        </div>
        <div className='col2'>
          <h2>{this.props.groupName}</h2>
          <div>Location: {this.props.location}</div>
          <div>Members: {this.props.memberCount}</div>
        </div>
      </div>
    );
  }
}

GroupBanner.propTypes = {
  groupName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  memberCount: PropTypes.number.isRequired,
  /*admins: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,*/
}

export default GroupBanner;
