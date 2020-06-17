
import SocketIO from 'socket.io';
import crypto from 'crypto-js';

import redis_client from './redis';

//import * as chat from './sockets/chat';

export default (server) => {
  const io = SocketIO(server, { origins: '*:*' });

  /* 1-to-1 chat namespace */

  const chat = io
    .of('chat')
    .on('connection', (socket) => {
      console.log('connected to Chat namespace');

      // create room and add 'currentUser'
      socket.on('createRoom', ({ currentUser, otherUser, }) => {
        console.log('current --> ', currentUser);
        console.log('other --> ', otherUser);

        const currentMD5 = crypto.MD5(currentUser).toString(crypto.enc.Hex);
        const otherMD5 = crypto.MD5(otherUser).toString(crypto.enc.Hex);

        console.log('currentMD5 --> ', currentMD5);
        console.log('otherMD5 --> ', otherMD5);

        const key = XOR_hex(currentMD5, otherMD5);
        console.log('opening room --> ', key);

        // create Room
        socket.join(key);

        // send 'key' back to user
        socket.emit('joinedRoom', { key });
      });

      // constantly update client with messages
      socket.on('readyForMessages', ({ key }/* options */) => {
        setInterval(async () => {
          console.log('sending');
          const messages = await redis_client.lrange(key, 0, -1);
          socket.emit('sendMessages', { messages });
        }, 1000);
      })

      // post message to room
      socket.on('addMessage', async ({ message, key }) => {
        console.log('message --> ', message);
        console.log('key --> ', key);
        await redis_client.lpush(key, message);
        // could add things like emit 'message successful'
      });

      // get messages from room (via polling)
      socket.on('getMessages', async ({ key }) => {
        const messages = await redis_client.lrange(key, 0, -1);
        socket.emit('sendMessages', { messages });
      });
    })
}

function XOR_hex(a, b) {
  var res = "",
      i = a.length,
      j = b.length;
  while (i-->0 && j-->0)
      res = (parseInt(a.charAt(i), 16) ^ parseInt(b.charAt(j), 16)).toString(16) + res;
  return res;
}

/* send 'otherUser' the 'socketId' used to join the room (via clicking on the chatbox)
socket.on('addUserToRoom', () => {

});
*/


