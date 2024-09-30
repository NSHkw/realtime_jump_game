// src/models/stage.model.js

// 여기서 stages는 객체 형태로 uuid를 key
// value는 stageId를 가진 배열 (어디 스테이지를 지났는지)
const stages = {};

export const createStage = (uuid) => {
  stages[uuid] = [];
};

// 현재 유저의 stage가 어디인지
export const getStage = (uuid) => {
  return stages[uuid];
};

export const setStage = (uuid, stageId) => {
  return stages[uuid].push(stageId);
};
