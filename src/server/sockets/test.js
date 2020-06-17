

/* called everytime a client connects to socket.io */
io.on('connection', (socket) => {
  console.log('Client connected...');

  /* ENDPOINTS */

  // send comments to client
  socket.on('join', async (data) => {
    console.log('join data --> ', data);

    // get comments from redis
    const messages = await redis_client.lrange('messages', 0, -1);
    console.log('sync messages --> ', messages);

    // send comments to client
    socket.emit('sync', JSON.stringify({ messages }));
  });

  // post new comment to redis
  socket.on('add', async (data) => {
    const req = JSON.parse(data);
    console.log('add data --> ', req);
    await redis_client.lpush('messages', req.message);

    // push new message to clients
    socket.emit('added', JSON.stringify({ message: req.message }));
  })

  /* ERROR HANDLING */
  socket.on('error', function (err) {
    console.log('socket err --> ', err);
  })

  /* DISCONNECT */
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

