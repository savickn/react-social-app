
import {
  SHOW_CHAT, HIDE_CHAT, 
  OPEN_CONNECTION, CLOSE_CONNECTION, 
} from './ChatActions';

/* where each connection has: 
** userId
*/
const initialState = {
  connections: [], 
}

const ChatReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_CONNECTION:
      return {
        connections: [...state.connections, { userId: action.userId }]
      }
    case CLOSE_CONNECTION:
      return {
        connections: state.connections.filter(conn => conn.userId !== action.userId)
      }

    /*
    case SHOW_CHAT: 
      return {
        hidden: false, 
        userId: action.userId, 
      }
    case HIDE_CHAT:
      return {
        hidden: true,
        userId: null, 
      }
    */
    default:
      return state;
  }
}

export const getConnections = (state) => state.chat.connections;
export const getConnectionById = (state, id) => state.chat.connections.filter(c => c.userId === id)[0];


const isHidden = (state) => state.chat.hidden;
const targetUser = (state) => state.chat.userId; 

export default ChatReducer;
