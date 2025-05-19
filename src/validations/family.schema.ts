import { z } from 'zod';

export const createFamilySchema = z.object({
	name: z.string().min(1, 'Family name is required'),
});

export const updateFamilySchema = z.object({
	name: z.string().min(1, 'Family name is required').optional(),
});
