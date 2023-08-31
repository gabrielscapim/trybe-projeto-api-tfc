import { Request, Response, Router } from 'express';
import LoginController from '../controller/LoginController';
import ValidateLogin from '../middlewares/ValidateLogin';
import ValidateToken from '../middlewares/ValidateToken';

const loginController = new LoginController();
const router = Router();

router.post(
  '',
  ValidateLogin.validateLoginFields,
  (req: Request, res: Response) => loginController.login(req, res),
);
router.get(
  '/role',
  ValidateToken.validateToken,
  (req: Request, res: Response) => loginController.getUserRole(req, res),
);

export default router;
