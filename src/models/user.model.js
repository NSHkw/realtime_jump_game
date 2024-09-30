const users = [];

export const getUsers = () => {
  return users;
};

export const addUser = (human) => {
  users.push(human);
};

export const removeUser = (socketId) => {
  const index = users.findIndex((human) => human.socketId === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
