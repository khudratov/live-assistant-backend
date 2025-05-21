import { Router } from 'express';
import * as userController from '../controllers/users.controller';
import { createUserSchema, updateUserSchema } from '../validations/user.validation';
import { protectMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";


const router = Router();

router.use(protectMiddleware);

router.post('/', validate(createUserSchema), userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', validate(updateUserSchema), userController.update);
router.delete('/:id', userController.remove);

export default router;
