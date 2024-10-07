import { Server as socketIO } from 'socket.io';
import { userRegisterHandler } from '../handlers/userRegister.handler.js';

export const initSocket = (server) => {
  const io = new socketIO();
  io.attach(server);

  userRegisterHandler(io);
};
