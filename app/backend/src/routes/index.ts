import { Router } from 'express';
import teamRouter from './Team.routes';
import loginRouter from './Login.routes';
import matchRouter from './Match.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
