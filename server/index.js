const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
  },
});

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data);
  });

  socket.on('send', (data) => {
    socket.to(data.roomID).emit('receive', data);
  });

  socket.on('disconnect', () => {});
});

server.listen(3001, () => {
  console.log('Server is running');
});
