import { Request, Response, Router } from 'express';
import TeamController from '../controller/TeamController';

const teamController = new TeamController();
const router = Router();

router.get('/:id', (req: Request, res: Response) => teamController.findById(req, res));
router.get('', (req: Request, res: Response) => teamController.findAll(req, res));

export default router;
