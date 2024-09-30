// src/init/socket.js
import { Server as socket } from 'socket.io';
import userRegisterHandler from '../handlers/userRegister.handler';

const initSocket = (server) => {
  const io = new socket(server);

  userRegisterHandler(io);
};

export default initSocket;
