import { Request, Response } from 'express';
import * as familyService from '../services/family.service';
import { getErrorMessage } from "../helpers/errors";


export async function createFamily(req: Request, res: Response) {
	try {
		const user = req.user as {
			id: string
		};
		const {name} = req.body;
		const family = await familyService.createFamily(user.id, name);
		res.status(201).json(family);
	} catch (error) {
		res.status(400).json({error: getErrorMessage(error)});
	}
}


export async function getAllFamilies(req: Request, res: Response) {
	try {
		const user = req.user as {
			id: string
		};
		const families = await familyService.getAllFamilies(user.id);
		res.status(200).json(families);
	} catch (error) {
		res.status(500).json({error: getErrorMessage(error)});
	}
}


export async function getFamilyById(req: Request, res: Response) {
	try {
		const user = req.user as {
			id: string
		};
		const {id} = req.params;
		const family = await familyService.getFamilyById(user.id, id);
		if (!family) {
			res.status(404).json({error: 'Family not found'});
			return;
		}
		res.status(200).json(family);
	} catch (error) {
		res.status(400).json({error: getErrorMessage(error)});
	}
}


export async function updateFamily(req: Request, res: Response) {
	try {
		const user = req.user as {
			id: string
		};
		const {id} = req.params;
		const updatedFamily = await familyService.updateFamily(user.id, id, req.body);
		if (!updatedFamily) {
			res.status(404).json({error: 'Family not found'});
			return;
		}
		res.status(200).json(updatedFamily);
	} catch (error) {
		res.status(400).json({error: getErrorMessage(error)});
	}
}


export async function deleteFamily(req: Request, res: Response) {
	try {
		const user = req.user as {
			id: string
		};
		const {id} = req.params;
		const deleted = await familyService.deleteFamily(user.id, id);
		if (!deleted) {
			res.status(404).json({error: 'Family not found'});
			return;
		}
		res.status(200).json({message: 'Family deleted successfully'});
	} catch (error) {
		res.status(400).json({error: getErrorMessage(error)});
	}
}
