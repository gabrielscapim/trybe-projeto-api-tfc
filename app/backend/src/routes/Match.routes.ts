import { Request, Response, Router } from 'express';
import MatchController from '../controller/MatchController';
import ValidateToken from '../middlewares/ValidateToken';

const matchController = new MatchController();
const router = Router();

router.get(
  '',
  (req: Request, res: Response) => matchController.findAll(req, res),
);
router.patch(
  '/:id/finish',
  ValidateToken.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch(
  '/:id',
  ValidateToken.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.post(
  '',
  ValidateToken.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
