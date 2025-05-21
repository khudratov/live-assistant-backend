import mongoose from 'mongoose';
import { Expense } from '../models/expense.model';
import { Wallet } from '../models/wallet.model';
import { FamilyMember } from "../models/family-member.model";


export const createExpense = async (data: {
	title: string;
	cost: number;
	familyMember: mongoose.Types.ObjectId;
}) => {
	const expense = new Expense(data);
	await expense.save();

	const wallet = await Wallet.findOneAndUpdate(
		{familyMember: data.familyMember},
		{$inc: {balance: -data.cost}}
	);

	if (!wallet) {
		throw new Error('Wallet not found');
	}

	return expense;
};

export const getAllExpenses = async (user: string) => {
	const familyMembers = await FamilyMember.find({user}).select('_id');

	const familyMemberIds = familyMembers.map(member => member._id);

	return Expense.find({
		familyMember: {$in: familyMemberIds}
	}).populate('familyMember');
};


export const getExpenseById = (id: string) => Expense.findById(id).populate('familyMember');
export const updateExpense = (id: string, data: any) => Expense.findByIdAndUpdate(id, data, {new: true});
export const deleteExpense = (id: string) => Expense.findByIdAndDelete(id);
