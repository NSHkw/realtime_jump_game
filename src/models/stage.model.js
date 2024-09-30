const stages = {};

export const createStage = (uuid) => {
  stages[uuid] = [];
};

export const getStage = (uuid) => {
  return stages[uuid];
};

export const setStage = (uuid, stageId) => {
  return stages[uuid].push(stageId);
};
