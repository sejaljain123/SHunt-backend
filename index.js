const express = require('express');
const database = require('./database');
const cors = require('cors');
const script = require('./script');
const userRouter = require('./routes/route');
const http = require('http');
const app = express();
const Notification = require('./models/notification');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
require('dotenv').config();

const start = async () => {
  await database.connect();
  app.use(cors());
  app.use(express.json());
  app.use('/', userRouter);
  app.get('/', (req, res) => {
    res.send('Hello World');
  });
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('test', (message) => {
      console.log(message);
    });
    socket.on('branches', async ({ data, pincode }) => {
      // console.log(data);
      for await (branch of data) {
        await Notification.create({
          pincode,
          message: 'Your branch was searched on ' + new Date(),
          branchId: branch._id,
          read: false,
          date: new Date(),
          admin_read: false,
        });
        io.emit(`branch-${branch._id}`, 'checking');
        io.emit(`admin-notifications`, '');
      }
    });
  });
  server.listen(5000, () => {
    console.log(`app is running on port 5000`);
  });
  // script.insertData();
};

start();
