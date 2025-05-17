import { Family } from '../models/family.model';
import { Types } from 'mongoose';


export async function createFamily(user_id: string, name: string) {
	const family = new Family({name, user_id});
	return await family.save();
}


export async function getAllFamilies(user_id: string) {
	return Family.find({user_id});
}


export async function getFamilyById(user_id: string, id: string) {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error('Invalid Family ID');
	}
	return Family.findOne({_id: id, user_id});
}


export async function updateFamily(user_id: string, id: string, updateData: {
	name?: string
}) {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error('Invalid Family ID');
	}
	return Family.findOneAndUpdate({_id: id, user_id}, updateData, {new: true});
}


export async function deleteFamily(user_id: string, id: string) {
	if (!Types.ObjectId.isValid(id)) {
		throw new Error('Invalid Family ID');
	}
	return Family.findOneAndDelete({_id: id, user_id});
}
