
import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const ENDPOINT = "http://127.0.0.1:3001";
const socket = io.connect(ENDPOINT);

// represents a chat window between two Users
class ChatTest extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.chatRef = React.createRef();
  }

  componentDidMount() {
    // request data from server
    socket.on('connect', (data) => {
      console.log('socket io connected');
      socket.emit('join', 'Hello World from client');
    });   

    // receive data from server... SHOULD BE WORKING
    socket.on('sync', (data) => {
      const res = JSON.parse(data);
      console.log('sync data --> ', res);
      this.setState({ messages: res.messages });
    });

    // listen for newly added method
    socket.on('added', (data) => {
      const res = JSON.parse(data);
      console.log('sync data --> ', res);
      this.setState({ messages: [...this.state.messages, res.message ] });
    })
  }

  // is this correct???
  /*componentWillUnmount() {
    socket.disconnect();
  }*/

  // save message to server
  addMessage = () => {
    console.log('addMessage');
    socket.emit('add', JSON.stringify({ message: this.chatRef.current.value }));
  }
  
  render() {
    return (
      <div>
        <div className='messageContainer'>
          { this.state.messages.map((msg) => {
            return <div>{msg}</div>
          })}
        </div>
        <textarea ref={this.chatRef} />
        <button onClick={this.addMessage}>Add Message</button>
      </div>   
    )
  }
}

ChatTest.propTypes = {
  user: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired, 

  showChat: PropTypes.bool.isRequired, 
}

export default ChatTest;

