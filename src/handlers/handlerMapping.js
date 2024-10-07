import { gameEnd, gameStart } from './game.handler.js';
import { eatItemHandler } from './item.handler.js';
import userRegisterHandler from './userRegister.handler.js';

const handlerMapping = {
  11: userRegisterHandler,
  2: gameStart,
  3: gameEnd,
  12: eatItemHandler,
};

export default handlerMapping;
