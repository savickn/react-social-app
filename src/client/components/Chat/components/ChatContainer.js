
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChatView from './ChatView';

import { closeConnection, } from '../ChatActions';
import { getConnections, } from '../ChatReducer';

import styles from './ChatContainer.scss';

// a container that manages one or more ChatViews
class ChatContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  // close existing ChatView
  closeConnection = (userId) => {
    console.log('closing --> ', userId);
    this.props.dispatch(closeConnection(userId));
  }

  render() {
    console.log('chatContainer props --> ', this.props);

    return (
      <div className={styles.chatContainer}>
        { this.props.connections.map((conn, idx) => {
          return <ChatView key={idx} close={this.closeConnection} userId={conn.userId} currentUser={this.props.currentUser} />
        })}
      </div>
    )
  }
}

ChatContainer.propTypes = {
  currentUser: PropTypes.object.isRequired, 
}

function mapStateToProps(state, props) {
  return {
    connections: getConnections(state), 
  }
}

export default connect(mapStateToProps)(ChatContainer);

