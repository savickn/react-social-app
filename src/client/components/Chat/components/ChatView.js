
import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrinAlt } from '@fortawesome/free-regular-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons';


import styles from './ChatView.scss';

const ENDPOINT = 'http://localhost:3001/chat';
let socket;

// represents a chat window between two Users
class ChatView extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      roomKey: null, 
      expanded: false, 
      messages: [],
    };
    this.chatRef = React.createRef();
  }

  componentDidMount() {
    socket = io.connect(ENDPOINT);
    
    const roomData = {
      otherUser: this.props.userId,
      currentUser: this.props.currentUser._id, 
    };

    // connect
    socket.on('connect', (data) => {
      console.log('connected to chat server');
    });

    // join socket io room
    socket.emit('createRoom', roomData);

    // get roomKey response from server
    socket.on('joinedRoom', ({ key }) => {
      console.log('key --> ', key);
      this.setState({ roomKey: key }, () => {
        // listen for messages from server
        socket.emit('readyForMessages', { key });
      })
    });

    // receive messages
    socket.on('sendMessages', ({ messages }) => {
      //console.log('sendMessages --> ', messages);
      this.setState({ messages });
    })
  }

  /* SOCKET IO EMITTERS */

  // get messages from server
  getMessages = () => {
    console.log('getMessages');
    socket.emit('getMessages', { key: this.state.roomKey });
  }

  // save message to server
  addMessage = () => {
    const data = { message: this.chatRef.current.value, key: this.state.roomKey };
    socket.emit('addMessage', data);
    this.chatRef.current.value = '';
  }
  
  /* SOCKET IO LISTENERS */




  // is this correct???
  /*componentWillUnmount() {
    socket.disconnect();
  }*/

  // used to minimize the chat window
  minimizeChat = () => {
    this.setState({ expanded: false });
  }

  // used to open the chat window
  expandChat = () => {
    this.setState({ expanded: true });
  }

  // used to close a connection
  handleClose = (e) => {
    e.preventDefault();
    this.props.close(this.props.userId);
  }

  handleAddMessage = (e) => {
    if(e.keyCode === 13) {
      this.addMessage();
    }
  }

  render() {
    const { expanded, messages, } = this.state;
    const { userId, currentUser, } = this.props;

    return (
      <div className={styles.chatView}>
        
        { expanded ? 
          /* displayed when chat is expanded */
          <div className={styles.expandedWindow} >
            <div className={styles.chatHeader}>
              <div>img</div>
              <div>{userId}</div>
              <div onClick={this.minimizeChat}>x</div>
            </div>

            <div className={styles.chatBody}>
              { messages.map(msg => {
                return <div>{msg}</div>
              })}
            </div>

            <div className={styles.chatFooter}>
              <FontAwesomeIcon icon={faUpload} size='2x' />
              <FontAwesomeIcon icon={faGrinAlt} size='2x' />
              <div>
                <input type='text' placeholder='Aa' className='form-control' 
                  onKeyUp={this.handleAddMessage} ref={this.chatRef} />
              </div>
            </div>
          </div>

          :

          /* displayed when chat is minimized */
          <div className={styles.minimizedWindow} onClick={this.expandChat}>
            <div className='onlineStatus'></div>
            <div className='userName'>{userId}</div>
            <div className='exitBtn' onClick={this.handleClose}>x</div>
          </div>
        }
      </div>
    )
  }
}

ChatView.propTypes = {
  userId: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired, 
  
  close: PropTypes.func.isRequired, 
}

export default ChatView;

