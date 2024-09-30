import express, { urlencoded } from 'express';
import { createServer } from 'http';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(urlencoded({ extended: false }));
