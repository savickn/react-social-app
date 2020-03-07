
import React from 'react';
import PropTypes from 'prop-types';

import styles from './MouseTracker.scss';

class MouseTracker extends React.Component {
  
  componentDidMount() {
    
  }

  getPosition = () => {
    const x = '';
    const y = '';
    return { x, y };
  }

  render() {
    const { x, y } = this.getPosition(); 
    return (
      <div className={styles.mtContainer}>
        <div>X: {x}</div>
        <div>Y: {y}</div>
      </div>
    );
  }
} 

MouseTracker.propTypes = {

};

export default MouseTracker;


