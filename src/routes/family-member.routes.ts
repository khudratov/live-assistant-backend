import { Router } from 'express';
import * as familyMemberController from '../controllers/family-member.controller';
import { validate } from "../middlewares/validate.middleware";
import { createFamilyMemberSchema } from "../validations/family-member.validation";


const router = Router();


router.post('/', validate(createFamilyMemberSchema), familyMemberController.create);
router.get('/', familyMemberController.getAll);
router.get('/:id', familyMemberController.getById);
router.delete('/:id', familyMemberController.remove);

export default router;
