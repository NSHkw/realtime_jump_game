// src/models/user.model.js
const users = [];

export const getUsers = () => {
  return users;
};

// 여기서 human은 ({uuid, socketId}) 객체
// {
//     uuid: "...",
//     socketId: "..."
// }
export const addUser = (human) => {
  users.push(human);
};

// 삭제할 유저의 socketId 입력
// 배열의 findIndex로 배열 요소의 sckId와 삭제할 유저의 socketId 일치하는 것 찾기
// splice로 배열에서 index를 다시 찾고 하나만 제거 뒤 제거된 유저 반환
export const removeUser = (socketId) => {
  const index = users.findIndex((human) => human.socketId === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
