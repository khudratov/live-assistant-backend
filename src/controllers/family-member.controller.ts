import { Request, Response } from 'express';
import * as familyMemberService from '../services/family-member.service';


export const create = async (req: Request, res: Response) => {
	const {user, family, first_name, last_name} = req.body;
	const familyMember = await familyMemberService.createFamilyMember({user, family, first_name, last_name});
	res.status(201).json(familyMember);
};


export const getAll = async (_req: Request, res: Response) => {
	const members = await familyMemberService.getAllFamilyMembers();
	res.status(200).json(members);
};


export const getById = async (req: Request, res: Response) => {
	const {id} = req.params;
	const member = await familyMemberService.getFamilyMemberById(id);
	if (!member) {
		res.status(404).json({message: 'FamilyMember not found'});
		return
	}
	res.status(200).json(member);
};


export const remove = async (req: Request, res: Response) => {
	const {id} = req.params;
	const deleted = await familyMemberService.deleteFamilyMember(id);
	if (!deleted) {
		res.status(404).json({message: 'FamilyMember not found'});
		return
	}
	res.status(200).json({message: 'Deleted successfully'});
};
