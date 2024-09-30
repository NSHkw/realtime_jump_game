import { getGameAssets } from '../init/assets.js';
import { setStage } from '../models/stage.model.js';
import { getUsers, removeUser } from '../models/user.model.js';

// 유저가 연결 종료
export const handleDisconnect = (uuid, socket) => {
  removeUser(socket.id);
  console.log(`User disconnected ${socket.id}`);
};

// 유저 new 커넥팅
export const handleConnect = (userUUId, socket) => {
  console.log(`New user connected: ${userUUID} with socket ID ${socket.id}`);
  console.log('Current users:', getUsers());

  const { stages } = getGameAssets();

  setStage(userUUId, stages.data[0].id);
  console.log(`stage: ${getStage(userUUId)}`);

  socket.emit('connection', { uuid: userUUId });
};
