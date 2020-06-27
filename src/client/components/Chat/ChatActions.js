
export const OPEN_CONNECTION = 'OPEN_CONNECTION';
export const CLOSE_CONNECTION = 'CLOSE_CONNECTION';

export const openConnection = (user) => {
  return {
    type: OPEN_CONNECTION,
    user, 
  }
}

export const closeConnection = (userId) => {
  return {
    type: CLOSE_CONNECTION,
    userId,
  }
}

