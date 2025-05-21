import { Router } from 'express';
import * as expenseController from '../controllers/userExpense.controller';
import { validate } from "../middlewares/validate.middleware";
import { expenseSchema } from "../validations/expense.schema";

const router = Router();

router.post('/', validate(expenseSchema), expenseController.createExpense);
router.get('/', expenseController.getExpenses);
router.get('/:id', expenseController.getExpenseById);
router.put('/:id', validate(expenseSchema), expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

export default router;
