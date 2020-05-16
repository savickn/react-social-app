
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Image from 'react-bootstrap/Image';

import styles from './ProfileView.scss';

// basically used to display a Profile without editing capabilities
class ProfileView extends React.Component {
    
  render() {
    return (
      <Image src='' rounded fluid />
    );
  }
}


export default ProfileView;

