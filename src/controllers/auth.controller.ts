import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const result = await AuthService.register(email, password);
		res.status(201).json(result);
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const result = await AuthService.login(email, password);
		res.status(200).json(result);
	} catch (err: any) {
		res.status(401).json({ message: err.message });
	}
};
