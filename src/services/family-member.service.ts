import { FamilyMember } from '../models/family-member.model';


export const createFamilyMember = async (data: {
	user_id: string;
	family_id: string,
	first_name: string,
	last_name: string
}) => {
	return await FamilyMember.create(data);
};

export const getAllFamilyMembers = async () => {
	return await FamilyMember.find().populate('user_id').populate('family_id');
};

export const getFamilyMemberById = async (id: string) => {
	return await FamilyMember.findById(id).populate('user_id').populate('family_id');
};

export const deleteFamilyMember = async (id: string) => {
	return await FamilyMember.findByIdAndDelete(id);
};
