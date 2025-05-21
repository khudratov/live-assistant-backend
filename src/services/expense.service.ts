import mongoose from 'mongoose';
import { Expense } from '../models/expense.model';
import { Wallet } from '../models/wallet.model';

export const createExpense = async (data: {
	title: string;
	cost: number;
	familyMember: mongoose.Types.ObjectId;
}) => {
	const expense = new Expense(data);
	await expense.save();

	const wallet = await Wallet.findOneAndUpdate(
		{ familyMember: data.familyMember },
		{ $inc: { balance: -data.cost } }
	);

	if (!wallet) {
		throw new Error('Wallet not found');
	}

	return expense;
};

export const getAllExpenses = () => Expense.find();
export const getExpenseById = (id: string) => Expense.findById(id).populate('familyMember');
export const updateExpense = (id: string, data: any) => Expense.findByIdAndUpdate(id, data, { new: true });
export const deleteExpense = (id: string) => Expense.findByIdAndDelete(id);
