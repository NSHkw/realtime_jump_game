// src/init/assets.js
import path from 'path';
import { fileURLToPath } from 'url';

let gameAssets = [];

export const getGameAssets = () => {
  return gameAssets;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, '../../assets');

const readFileAsync = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

export const loadAssetAsync = async () => {
  try {
    const [stage, item, itemUnlock] = await Promise.all([
      readFileAsync('stage.json'),
      readFileAsync('item.json'),
      readFileAsync('item_unlock.json'),
    ]);
    gameAssets = { stage, item, itemUnlock };
  } catch (error) {
    console.error('에러 발생');
    return;
  }
};
