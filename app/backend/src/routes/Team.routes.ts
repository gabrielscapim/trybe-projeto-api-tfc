import { Request, Response, Router } from 'express';
import TeamController from '../controller/TeamController';

const teamContoller = new TeamController();
const router = Router();

router.get('', (req: Request, res: Response) => teamContoller.findAll(req, res));

export default router;
