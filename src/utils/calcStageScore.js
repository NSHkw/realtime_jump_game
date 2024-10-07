import { getGameAssets } from '../init/assets.js';

export const calcStageScore = (userStages, serverTime) => {
  let stageScore = 0;

  const { stages } = getGameAssets();
  const stageData = stages.data;

  userStages.forEach((element, index) => {
    let stageEndTime = 0;

    if (index === element.length - 1) {
      stageEndTime = serverTime; // 유저의 겜오버한 스테이지 or 마지막 스테이지
    } else {
      stageEndTime = stages[index + 1].timestamp;
    }

    let gameTime = (stageEndTime - element.timestamp) / 1000;

    let stageInfo = stageData.find((stage) => stage.id === element.id);
    let scorePerSecond = stageInfo.scorePerSecond;

    stageScore += gameTime * scorePerSecond;
  });

  return stageScore;
};
