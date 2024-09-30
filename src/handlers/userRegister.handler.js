import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../models/user.model.js';
import { handleConnect, handleDisconnect } from './helper.js';

const userRegisterHandler = (io) => {
  io.on('connection', (socket) => {
    // 서버 메모리에 유저를 추가하기
    const userUUId = uuidv4();
    addUser({ uuid: userUUId, socketId: socket.id });

    handleConnect(userUUId, socket);

    // 유저가 연결 종료 시 유저의 유저 아이디와 소켓을 가져와 연결 종료 실행
    socket.on('disconnect', () => {
      handleDisconnect(userUUId, socket);
    });
  });
};

export default userRegisterHandler;
