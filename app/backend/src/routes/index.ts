import { Router } from 'express';
import teamRouter from './Team.routes';

const router = Router();

router.use('/teams', teamRouter);

export default router;
