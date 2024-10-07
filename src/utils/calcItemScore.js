import { getGameAssets } from '../init/assets.js';

export const calcItemScore = (userItems) => {
  let itemTotal = 0;

  const { items } = getGameAssets();

  userItems.forEach((element) => {
    let item = items.data.find((item) => item.id === element.id);

    itemTotal += item.score;
  });

  return itemTotal;
};
