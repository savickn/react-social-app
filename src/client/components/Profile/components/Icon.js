
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './Icon.scss';

import noPic from './anon_user.png';

// basically used to display a Profile without editing capabilities
class Icon extends React.Component {
    
  render() {
    const myImg = this.props.path || noPic;
    return (
      <img src={myImg} className={styles.img} height='35' width='35' />
    );
  }
}

Icon.propTypes = {
  path: PropTypes.string, 
}

export default Icon;
