
import SocketIO from 'socket.io';
import crypto from 'crypto-js';

import redis_client from './redis';

//import * as chat from './sockets/chat';

const intervals = [];

export default (server) => {
  const io = SocketIO(server, { origins: '*:*' });

  /* 1-to-1 chat namespace */

  const chat = io
    .of('chat')
    .on('connection', (socket) => {
      console.log('connected to Chat namespace');

      // create room and add 'currentUser'
      socket.on('createRoom', ({ currentUser, otherUser, }) => {
        
        // maps UserId to SocketId
        redis_client.set(socket.id, currentUser);

        const currentMD5 = crypto.MD5(currentUser).toString(crypto.enc.Hex);
        const otherMD5 = crypto.MD5(otherUser).toString(crypto.enc.Hex);

        const key = XOR_hex(currentMD5, otherMD5);
        //console.log('opening room --> ', key);

        // create Room
        socket.join(key);

        // list of RoomIds mapped to one UserId
        redis_client.rpush(`${currentUser} Rooms`, socket.id);

        // send room info (e.g. 'key') to newly connected client
        socket.emit('server:userJoined', { key, socketId: socket.id });

        // send info about newly connected client to all other room Users... NOT WORKING
        // BUG --> info of first user will not be seen by later users
        // socket.in(key).emit('server:userStateChange', { socketId: socket.id, userId: currentUser, connected: status });
      });


      /* PUBLISHING */

      // post message to room
      socket.on('addMessage', async ({ message, key, userId }) => {
        console.log('message --> ', message);
        console.log('key --> ', key);
        console.log('userId --> ', userId);
        const date = new Date();

        await redis_client.rpush(key, JSON.stringify({ message, userId, date }));
        // could add things like emit 'message successful'
      });

      // used to consistently broadcast currentUser status to all other users
      socket.on('client:broadcastStatusChange', ({ key, userId, socketId }) => {
        const i = setInterval(() => {
          console.log(socket.adapter.rooms);
          console.log(key);
          console.log(socketId);
          console.log(userId)
          const connected = socket.adapter.rooms[key].sockets[socketId]; // eventually change to be more detailed (e.g. away/etc)
          socket.emit('server:broadcastStatus', { userId, socketId, connected }); 
        }, 10000);
        intervals.push(i);
      })

      socket.on('client:leave', ({ key }) => {
        
        // clear intervals
        for(let i of intervals) {
          clearInterval(i);
        }

        // leave room
        socket.leave(key);
      })

      /* SUBSCRIPTIONS */


      // send list of users to all connected clients 
      // should prob create on 'requestUser' setInterval when Room is created that broadcasts to all clients
      socket.on('client:requestUsers', ({ key }) => {
        const i = setInterval(async () => {
          const sockets = socket.adapter.rooms[key].sockets;
          console.log('sockets --> ', sockets);

          const users = {};
          for(let key of Object.keys(sockets)) {
            const userId = await redis_client.get(key);
            console.log(userId);
            users[userId] = { 
              socketId: key, 
              connected: sockets[key],
            };
          }
          console.log('users --> ', users);

          socket.emit('server:sendUsers', { users });
        }, 10000);
        intervals.push(i);
      });

      // request Messages from a particular Room (via 'key')
      socket.on('client:requestMessages', ({ key }/* options */) => {
        const i = setInterval(async () => {
          const messages = await redis_client.lrange(key, 0, -1);
          socket.emit('server:sendMessages', { messages });
        }, 1000);
        intervals.push(i);
      });

      // send currentUser status to all other users
      socket.on('client:requestStatus', ({ key, socketId }) => {
        setInterval(async () => {
          //const connected = io.sockets.adapter.rooms[key].sockets[socketId];
          //socket.broadcast.emit('server:sendStatus', { connected });

          
          //socket.to(socket.id).emit('server:sendOnlineStatus', { connected });
        }, 10000);
      });


      /* Redis:  
      userId --> socketId (potentially buggy cuz one user can have many sockets... might need to use List)

      roomId --> message List

      userId --> roomId List
      */





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


  // get messages from room (via polling)
  /*socket.on('getMessages', async ({ key }) => {
    const messages = await redis_client.lrange(key, 0, -1);
    socket.emit('sendMessages', { messages });
  });*/
