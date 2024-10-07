const stages = {};

export const getStages = (userId) => {
  return stages[userId];
};

export const setStage = (userId, stageId, timestamp) => {
  stages[userId].push({ stageId, timestamp });
};

export const clearStage = (userId) => {
  return (stages[userId] = []);
};

export const createStage = (userId) => {
  stages[userId] = [];
};
