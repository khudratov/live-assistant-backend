import { Request, Response } from 'express';
import * as expenseService from '../services/userExpense.service';

export const createExpense = async (req: Request, res: Response) => {
	try {
		const expense = await expenseService.createExpense(req.body);
		res.status(201).json(expense);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const getExpenses = async (req: Request, res: Response) => {
	const user_id = (req.user!).id;
	const expenses = await expenseService.getAllExpenses(user_id);

	res.json(expenses);
};

export const getExpenseById = async (req: Request, res: Response) => {
	const expense = await expenseService.getExpenseById(req.params.id);
	if (!expense) {
		res.status(404).json({ error: 'Expense not found' });
		return
	}
	res.json(expense);
};

export const updateExpense = async (req: Request, res: Response) => {
	try {
		const updated = await expenseService.updateExpense(req.params.id, req.body);
		res.json(updated);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const deleteExpense = async (req: Request, res: Response) => {
	try {
		await expenseService.deleteExpense(req.params.id);
		res.status(204).send();
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
