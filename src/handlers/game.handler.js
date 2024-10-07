import { getGameAssets } from '../init/assets.js';
import { clearUserItem, getObtainedItems } from '../models/item.model.js';
import { clearStage, getStages, setStage } from '../models/stage.model.js';
import { calcItemScore } from '../utils/calcItemScore.js';
import { calcStageScore } from '../utils/calcStageScore.js';

export const gameStart = (userId, payload) => {
  const { stages } = getGameAssets();

  clearStage(userId);
  clearUserItem(userId);
  setStage(userId, stages.data[0].id, payload.timestamp);

  return { status: 'success', handlerId: 2 };
};

export const gameEnd = (userId, payload) => {
  const { timestamp: gameEndTime, score } = payload;
  const userStages = getStages(userId);
  const userItems = getObtainedItems(userId);

  if (!userStages.length) {
    return { status: 'fail', message: '스테이지 존재 x' };
  }

  const total = calcItemScore(userItems) + calcStageScore(userStages, gameEndTime);

  // TODO: 클라에서 받은 점수와 서버에서 계산한 점수의 차이 검증

  console.log('클라 점수', score);
  console.log('서버 계산 점수', total);

  return { status: 'success', message: 'game finish/over', score, handlerId: 3 };
};
