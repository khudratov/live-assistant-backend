import {Request, Response, NextFunction} from 'express';
import {ZodSchema} from 'zod';

export const validate =
	(schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction): void => {
		if (!req.body || Object.keys(req.body).length === 0) {
			res.status(400).json({
				message: 'Missing request body',
				errors: [{path: 'body', message: 'Request body is required'}],
			});
			return
		}

		const result = schema.safeParse(req.body);

		if (!result.success) {
			res.status(400).json({
				message: 'Validation error',
				errors: result.error.errors.map((e) => ({
					path: e.path.join('.'),
					message: e.message,
				})),
			});
			return
		}

		req.body = result.data;
		next();
	};
