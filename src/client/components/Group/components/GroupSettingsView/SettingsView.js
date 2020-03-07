import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SettingsView extends Component {

  selectImage = (se) => {

  }

  render() {
    return (
      <div>
        <img src='' onClick={this.selectImage}></img>
      </div>
    );
  }
}

SettingsView.propTypes = {

}

export default SettingsView;
