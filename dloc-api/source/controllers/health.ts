import express from 'express';
import { getPersistence } from '../persistence/persistence';
import { persistenceHealth } from '../services/health/persistenceHealth';

const routers = express.Router();

routers.get('/health', (req, res, next) => res.status(200).json({ message: 'ok' }));

routers.get('/persistenceHealth', (req, res, next) => persistenceHealth(getPersistence()).then((response) => res.status(response.code).json(response.result)));

export default routers;
