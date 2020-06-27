
import {
  SHOW_CHAT, HIDE_CHAT, 
  OPEN_CONNECTION, CLOSE_CONNECTION, 
} from './ChatActions';

import { insertItem } from '../../util/utilFuncs';

/* where each connection has: 
** userId
*/
const initialState = {
  connections: [], // represents active Chats
  collection: [], // represents references to existing Chats (not necessarily active)
}

const ChatReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_CONNECTION:
      return {
        connections: [...state.connections.filter(conn => conn.user._id !== action.user._id), { user: action.user }]
      }
    case CLOSE_CONNECTION:
      return {
        connections: state.connections.filter(conn => conn.user._id !== action.userId)
      }
    default:
      return state;
  }
}

export const getConnections = (state) => state.chat.connections;
export const getConnectionById = (state, id) => state.chat.connections.filter(c => c.user._id === id)[0];


export default ChatReducer;
