import { createStage } from '../models/stage.model.js';
import { getUsers, removeUser } from '../models/user.model.js';
import { CLIENT_VERSION } from '../constants.js';
import handlerMapping from './handlerMapping.js';

export const handleConnection = (socket, userId) => {
  console.log(`새 유저 연결 ${userId}, 소켓 ${socket.id}`);
  console.log('현재 유저', getUsers());

  createStage(userId);
  socket.emit('connection', { userId: userId });
};

export const handleDisconnect = (socket) => {
  removeUser(socket.id);
  console.log('유저 연결 해제', socket.id);
  console.log('현재 유저', getUsers());
};

export const handleEvent = (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    socket.emit('response', { status: 'fail', message: '버전 mismatch' });
    return;
  }

  const handler = handlerMapping[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: '핸들러 정보 없음' });
    return;
  }

  const response = handler(data.userId, data.payload);
  if (response.broadcast) {
    io.emit('response', response);
    return;
  }

  socket.emit('response', response);
};
