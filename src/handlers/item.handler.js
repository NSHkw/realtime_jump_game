import { getGameAssets } from '../init/assets.js';
import { addItem } from '../models/item.model.js';
import { getStages } from '../models/stage.model.js';

export const eatItemHandler = (userId, payload) => {
  const { itemId } = payload;

  let userStages = getStages(userId);
  if (!userStages) {
    return { status: 'fail', message: '지나간 스테이지 정보가 없어' };
  }

  userStages.sort((a, b) => a.id - b.id);
  let lastStage = userStages[userStages.length - 1];
  if (lastStage.id !== currentStage) {
    return { status: 'fail', message: '최종 스테이지 매치 X' };
  }

  const { itemUnlocks } = getGameAssets();

  const unlockedItem = itemUnlocks.data.find((data) => data.stage_id === lastStage.id).item_id;
  if (!unlockedItem.includes(itemId)) {
    return { status: 'fail', message: '못먹는 아이템' };
  }

  addItem(userId, itemId);
  return { status: 'success', handlerId: 12 };
};
