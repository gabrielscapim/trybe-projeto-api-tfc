import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardController = new LeaderboardController();
const router = Router();

router.get(
  '/:main',
  (req: Request, res: Response) => leaderboardController.findLeaderboard(req, res),
);

export default router;
