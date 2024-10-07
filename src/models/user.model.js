const users = [];

export const getUsers = () => {
  return users;
};

export const addUsers = (user) => {
  users.push(user); // user = {userId, socket}
};

export const removeUser = (socketId) => {
  const index = users.findIndex((data) => data.socketId === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
