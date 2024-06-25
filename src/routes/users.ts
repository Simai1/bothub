import {Router} from 'express';
import validate from '../middlewares/validate';
import usersController from '../controllers/users.controller';
import usersValidation from "../validations/users.validation";
import verifyRole from "../middlewares/verify-role";
import {Role} from "@prisma/client";
import verifyToken from "../middlewares/verify-token";

const router: Router = Router();

router.route('/me').get(verifyToken.auth, usersController.getProfile);
router.route('/:id/role').put(verifyRole(Role.ADMIN), validate(usersValidation.id), usersController.switchRole);

export default router;
