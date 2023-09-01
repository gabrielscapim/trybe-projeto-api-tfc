import { Router } from 'express';
import teamRouter from './Team.routes';
import loginRouter from './Login.routes';
import matchRouter from './Match.routes';
import leaderboardRouter from './Leaderboard.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
