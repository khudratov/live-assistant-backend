import { z } from 'zod';


export const createFamilyMemberSchema = z.object({
	user: z.string().min(1, 'User ID is required'),
	family: z.string().min(1, 'Family ID is required'),
	first_name: z.string().min(1, 'First Name is required'),
	last_name: z.string().min(1, 'Last Name is required'),
});
