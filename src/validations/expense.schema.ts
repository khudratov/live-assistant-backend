import { z } from 'zod';
import mongoose from 'mongoose';

export const expenseSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	cost: z.number().positive('Cost must be greater than zero'),
	familyMember: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
		message: 'Invalid familyMember ID',
	}),
});
