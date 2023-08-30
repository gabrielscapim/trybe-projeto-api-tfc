import { Router } from 'express';
import teamRouter from './Team.routes';
import loginRouter from './Login.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);

export default router;
