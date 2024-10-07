const obtainedItems = {};

export const getObtainedItems = (userId) => {
  return obtainedItems[userId];
};

export const addItem = (userId, item) => {
  obtainedItems[userId].push(item);
};

export const newUsersItem = (userId) => {
  obtainedItems[userId] = [];
};

export const clearUserItem = (userId) => {
  return (obtainedItems[userId] = []);
};
