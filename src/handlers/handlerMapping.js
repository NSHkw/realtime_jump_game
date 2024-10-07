import { gameEnd, gameStart } from './game.handler.js';
import { eatItemHandler } from './item.handler.js';
import { moveStageHandler } from './stage.handler.js';

const handlerMapping = {
  11: moveStageHandler,
  2: gameStart,
  3: gameEnd,
  12: eatItemHandler,
};

export default handlerMapping;
