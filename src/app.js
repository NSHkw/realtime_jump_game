// src/app.js
import express, { urlencoded } from 'express';
import { createServer } from 'http';
import { initSocket } from './init/socket.js';
import { loadAssetAsync } from './init/assets.js';

const app = express();
const server = createServer(app);
const PORT = 3000;

app.use(express.json());
app.use(urlencoded({ extended: false }));
initSocket(server);

app.get('/', (req, res) => {
  res.send('hello');
});

server.listen(PORT, async () => {
  console.log('서버 오픈');

  try {
    const assets = loadAssetAsync();
    console.log(assets);
  } catch (error) {
    console.error(error);
  }
});
