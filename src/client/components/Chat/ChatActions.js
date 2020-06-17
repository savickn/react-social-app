
export const OPEN_CONNECTION = 'OPEN_CONNECTION';
export const CLOSE_CONNECTION = 'CLOSE_CONNECTION';

export const openConnection = (userId) => {
  return {
    type: OPEN_CONNECTION,
    userId, 
  }
}

export const closeConnection = (userId) => {
  return {
    type: CLOSE_CONNECTION,
    userId,
  }
}


/* OLD */

export const HIDE_CHAT = 'HIDE_CHAT';
export const SHOW_CHAT = 'SHOW_CHAT';

export const hideChat = () => {
  return {
    type: HIDE_CHAT,
  }
}

export const showChat = (userId) => {
  return {
    type: SHOW_CHAT, 
    userId, 
  }
}
