import { v4 as uuid } from 'uuid';
import { addUsers } from '../models/user.model.js';
import { handleConnection, handleDisconnect, handleEvent } from './helper.js';

export const userRegisterHandler = (io) => {
  io.on('connection', (socket) => {
    const userId = uuid();

    addUsers({ userId: userId, socketId: socket.id });
    handleConnection(userId, socket);

    socket.on('event', (data) => handleEvent(io, socket, data));
    socket.on('disconnect', () => handleDisconnect(socket));
  });
};
