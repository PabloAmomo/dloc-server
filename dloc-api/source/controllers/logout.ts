import { encriptionHelper } from '../functions/encriptionHelper';
import { getPersistence } from '../persistence/persistence';
import { logoutUser } from '../functions/logoutUser';
import express, { Request, Response } from 'express';

const routers = express.Router();

routers.get('/logout', async (req: Request, res: Response, next) => {
  await logoutUser(req, getPersistence(), encriptionHelper);
  res.status(200).json({ message: 'ok' });
});

export default routers;