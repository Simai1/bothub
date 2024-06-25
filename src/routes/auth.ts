import { Router } from 'express';
import authController from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import authValidation from '../validations/auth.validation';
import verifyToken from "../middlewares/verify-token";

const router: Router = Router();

router.route('/register').post(validate(authValidation.register), authController.register);
router.route('/login').post(validate(authValidation.login), authController.login);
router.route('/logout').post(verifyToken.auth, validate(authValidation.refreshToken), authController.logout);
router.route('/refresh').get(validate(authValidation.refreshToken), authController.refresh);
export default router;
