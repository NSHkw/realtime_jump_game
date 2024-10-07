import { getGameAssets } from '../init/assets.js';
import { getObtainedItems } from '../models/item.model.js';
import { getStages, setStage } from '../models/stage.model.js';
import { calcItemScore } from '../utils/calcItemScore.js';
import { calcStageScore } from '../utils/calcStageScore.js';

// moveStageHandler- 현재 스테이지, 다음 스테이지 클라로부터 받아오고, 현재 스테이지까지 얻은 점수를 가지고 다음 스테이지로 전달
export const moveStageHandler = (userId, payload) => {
  let userStages = getStages(userId);
  if (!userStages) {
    return { status: 'fail', message: '지나간 스테이지 정보가 없어' };
  }

  userStages.sort((a, b) => a.id - b.id);
  let lastStage = userStages[userStages.length - 1];
  if (lastStage.id !== currentStage) {
    return { status: 'fail', message: '최종 스테이지 매치 X' };
  }

  const currentStage = payload.currentStage;
  const targetStage = payload.targetStage;
  const userItems = getObtainedItems(userId);
  const { stages } = getGameAssets();

  const currentStageInfo = stages.data.find((data) => data.id === currentStage);
  if (!currentStageInfo) {
    return { status: 'fail', message: '현재 스테이지 정보 없음' };
  }

  const serverTime = Date.now();

  const pastTotalScore = calcStageScore(userStages, serverTime);
  const pastItemScore = calcItemScore(userItems);
  const total = pastTotalScore + pastItemScore;

  setStage(userId, targetStage, serverTime);

  return { status: 'success', handlerId: 11 };
};
