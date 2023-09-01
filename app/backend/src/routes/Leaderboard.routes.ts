import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardController = new LeaderboardController();
const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.findHomeLeaderboard(req, res),
);

export default router;
