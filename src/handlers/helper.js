// src/handlers/helper.js
import { getGameAssets } from '../init/assets.js';
import { setStage } from '../models/stage.model.js';
import { getUsers, removeUser } from '../models/user.model.js';

// 유저가 disconnect 할 때 함수
export const handleDisconnect = (uuid, socket) => {
  removeUser(socket.id);
  console.log(`User disconnected ${socket.id}`);
};

// 유저 새로 connection 할 때 처음 스테이지를 user의 아이디와 연동
export const handleConnect = (userUUId, socket) => {
  console.log(`New user connected: ${userUUID} with socket ID ${socket.id}`);
  console.log('Current users:', getUsers());

  const { stages } = getGameAssets();

  // 새로 유저가 추가되었기 때문에, 유저에게 stage의 첫번째 데이터의 id를 적용
  setStage(userUUId, stages.data[0].id);
  console.log(`stage: ${getStage(userUUId)}`);

  socket.emit('connection', { uuid: userUUId });
};
