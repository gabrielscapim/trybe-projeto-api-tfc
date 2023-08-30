import { Request, Response, Router } from 'express';
import LoginController from '../controller/LoginController';
import ValidateLogin from '../middlewares/ValidateLogin';

const loginController = new LoginController();
const router = Router();

router.post(
  '',
  ValidateLogin.validateLoginFields,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;
