import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { User } from "../models/user.model";


export const create = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			res.status(409).json({ message: 'User already exists' });
			return
		}

		const user = await userService.createUser(req.body);
		res.status(201).json(user);
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ message: error.message || 'Internal Server Error' });
	}
};

export const getAll = async (_req: Request, res: Response) => {
	const users = await userService.getAllUsers();
	res.status(200).json(users);
};

export const getById = async (req: Request, res: Response) => {
	const user = await userService.getUserById(req.params.id);
	if (!user) {
		res.status(404).json({message: 'User not found'});
		return
	}
	res.status(200).json(user);
};

export const update = async (req: Request, res: Response) => {
	const user = await userService.updateUser(req.params.id, req.body);
	if (!user) {
		res.status(404).json({message: 'User not found'});
		return
	}
	res.status(200).json(user);
};

export const remove = async (req: Request, res: Response) => {
	const user = await userService.deleteUser(req.params.id);
	if (!user) {
		res.status(404).json({message: 'User not found'});
		return
	}
	res.status(200).json({message: 'User deleted'});
};
