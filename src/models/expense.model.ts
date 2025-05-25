import mongoose, { Document, Types } from "mongoose";


interface IExpense extends Document {
	_id: Types.ObjectId
	familyMember: Types.ObjectId,
	title: string;
	cost: number;
	createdAt: Date;
	updatedAt: Date;
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
}, {timestamps: true})


export const Expense = mongoose.model<IExpense>('Expense', expenseSchema);


