
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './ChatCollectionPage.scss';

// a separate page which lists all previous Chats by date
class ChatCollectionPage extends React.Component {

  render() {
    return <div></div>
  }
}

ChatCollectionPage.propTypes = {

}

function mapStateToProps(props) {
  return {

  }
}

export default connect(mapStateToProps)(ChatCollectionPage);
