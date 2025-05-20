import { z } from 'zod';


export const createUserSchema = z.object({
	email: z.string().email({message: 'Invalid email'}),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const updateUserSchema = z.object({
	email: z.string().email().optional(),
	password: z.string().min(6).optional(),
});
