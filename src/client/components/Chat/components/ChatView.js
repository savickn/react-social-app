
import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrinAlt } from '@fortawesome/free-regular-svg-icons'
import { faUpload, faWindowClose, faWindowMinimize, faCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './ChatView.scss';

const ENDPOINT = 'http://localhost:3001/chat';
let socket;

// represents a chat window between two Users
class ChatView extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      mySocket: null, 
      sockets: {}, // e.g. userId: { socketId, connected }  
      roomKey: null, 

      expanded: true, 
      messages: [],
    };
    this.chatRef = React.createRef();
  }

  componentDidMount() {
    const { user, currentUser } = this.props;

    socket = io.connect(ENDPOINT);
    
    const roomData = {
      otherUser: user._id,
      currentUser: currentUser._id, 
    };

    // connect
    socket.on('connect', (data) => {
      console.log('connected to chat server');
    });

    // create/join a Room
    socket.emit('createRoom', roomData);

    /*
    ** server should emit 'joined' event
    ** subscribe to updates from Room (e.g. messages, users)
    */
    socket.on('server:userJoined', ({ key, socketId }) => {
      console.log('key --> ', key);

      this.setState({ roomKey: key, mySocket: socketId }, () => {
        // acknowledge that user is connected
        //socket.emit('client:broadcastStatusChange', { key, socketId, userId: currentUser._id })

        // listen for messages from server
        socket.emit('client:requestMessages', { key });
        socket.emit('client:requestUsers', { key });
        //socket.emit('client:requestStatus', { key, socketId });
      })
    });

    // called when User joins/leaves the room
    socket.on('server:userStateChange', ({ userId, socketId, connected }) => {
      const sockets = this.state.sockets;
      sockets[userId] = { socketId, connected };
      this.setState({ sockets });
    })


    // used to track which Users are connected to Room (e.g. online... away... offline)... prob NOT necessary
    socket.on('server:sendUsers', ({ users }) => {
      console.log('sendUsers --> ', users);
      this.setState({ sockets: users });
    })



                                            /* SOCKET IO LISTENERS */

    // 
    socket.on('server:broadcastStatus', ({ userId, socketId, connected }) => {
      const user = Object.keys(this.state.sockets).filter(k => k === userId)
      const sockets = this.state.sockets;
      sockets[userId] = { socketId, connected };
      console.log(sockets);

      this.setState({ sockets });
    })

    // receive messages
    socket.on('server:sendMessages', ({ messages }) => {
      //console.log('sendMessages --> ', messages);
      this.setState({ messages });
    })

    // receive onlineStatus of other User
    // states --> online, away (how??), offline 
    socket.on('server:sendStatus', ({ socketId, userId }) => {
      console.log(socketId, userId);
    })
  }

  // is this correct???
  /*componentWillUnmount() {
    socket.disconnect();
  }*/


                                          /* SOCKET IO EMITTERS */

  // used to notify server that user has logged off/etc
  userStateChanged = () => {
    socket.emit();
  }
 

  // get messages from server
  getMessages = () => {
    console.log('getMessages');
    socket.emit('getMessages', { key: this.state.roomKey });
  }

  // save message to server
  addMessage = () => {
    const data = { message: this.chatRef.current.value, key: this.state.roomKey, userId: this.props.currentUser._id };
    socket.emit('addMessage', data);
    this.chatRef.current.value = '';
  }

                                            /* EVENT HANDLERS */


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
    socket.emit('client:leave', { key: this.state.roomKey });
    this.props.close(this.props.user._id);
  }

  handleAddMessage = (e) => {
    if(e.keyCode === 13) {
      this.addMessage();
    }
  }

                                            /* VIEW CONDITIONALS */

  // checks if other user is connected
  isConnected = (userId) => {
    const { sockets } = this.state;
    
    console.log(userId)
    console.log('sockets --> ', sockets);

    console.log(sockets[userId]);

    return sockets[userId] && sockets[userId].connected;
  }

  render() {
    const { expanded, messages, connected } = this.state;
    const { user, currentUser, } = this.props;

    const isConnected = this.isConnected(user._id);
    console.log(isConnected);

    return (
      <div className={styles.chatView}>
        
        { expanded ? 
          /* displayed when chat is expanded */
          <div className={styles.expandedWindow} >
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                { isConnected ? 
                  <FontAwesomeIcon icon={faCircle} color='green' />
                  : 
                  <FontAwesomeIcon icon={faCircle} color='grey' />
                }
                <div>{user.name}</div>
              </div>

              <div className={styles.controls}>
                <div onClick={this.minimizeChat} className='click-cursor'>
                  <FontAwesomeIcon icon={faWindowMinimize} />
                </div>
                <div onClick={this.handleClose} className='click-cursor'>
                  <FontAwesomeIcon icon={faWindowClose} />
                </div>
              </div>
            </div>

            <div className={styles.chatBody}>
              { messages.map((msg, idx) => {
                const prev = JSON.parse(messages[Math.max(0, idx - 1)]);
                const m = JSON.parse(msg);
                const isCurrentUser = m.userId === currentUser._id; 
                const prevDate = new Date(prev.date);
                const currentDate = new Date(m.date)

                return (
                  <div className='messageContainer'> 
                    { currentDate.getHours() !== prevDate.getHours() || currentDate.getMinutes() !== prevDate.getMinutes() ?
                      <div className={styles.messageDate}>
                        <span> { Moment(new Date(currentDate)).format("MMM D, YYYY, h:mm a") } </span>
                      </div> : null
                    }
                    <div className={isCurrentUser ? styles.alignRight : styles.alignLeft}>
                      <span className={isCurrentUser ? styles.commentRight : styles.commentLeft}>{m.message}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.chatFooter}>
              <FontAwesomeIcon icon={faUpload} size='2x' />
              <FontAwesomeIcon icon={faGrinAlt} size='2x' />
              <div className={styles.input}>
                <input type='text' placeholder='Aa' className='form-control' 
                  onKeyUp={this.handleAddMessage} ref={this.chatRef} />
              </div>
            </div>
          </div>

          :

          /* displayed when chat is minimized */
          <div className={styles.minimizedWindow} onClick={this.expandChat}>
            <div className='onlineStatus'>

            </div>
            <div className='userName'>{user.name}</div>
            <div className='exitBtn' onClick={this.handleClose}>
              <FontAwesomeIcon icon={faWindowClose} />
            </div>
          </div>
        }
      </div>
    )
  }
}

ChatView.propTypes = {
  user: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired, 
  
  close: PropTypes.func.isRequired, 
}

export default ChatView;

