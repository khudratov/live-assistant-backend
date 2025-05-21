import mongoose, { Document, Types } from "mongoose";

interface IExpense extends Document {
	_id: Types.ObjectId
	familyMember: Types.ObjectId,
	title: string;
	cost: number
}

const expenseSchema = new mongoose.Schema({
	cost: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	familyMember: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'FamilyMember',
		required: true
	},
})


export const Expense = mongoose.model<IExpense>('Expense', expenseSchema);


