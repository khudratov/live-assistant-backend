import { Router } from 'express';
import * as familyController from '../controllers/family.controller';
import { validate } from "../middlewares/validate.middleware";
import { createFamilySchema, updateFamilySchema } from "../validations/family.schema";


const router = Router();

router.post('/', validate(createFamilySchema), familyController.createFamily);

router.get('/', familyController.getAllFamilies);

router.get('/:id', familyController.getFamilyById);

router.put('/:id', validate(updateFamilySchema), familyController.updateFamily);

router.delete('/:id', familyController.deleteFamily);

export default router;
