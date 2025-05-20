import { FamilyMember } from '../models/family-member.model';


export const createFamilyMember = async (data: {
	user: string;
	family: string,
	first_name: string,
	last_name: string
}) => {
	return await FamilyMember.create(data);
};

export const getAllFamilyMembers = async () => {
	return FamilyMember.find();
};

export const getFamilyMemberById = async (id: string) => {
	return FamilyMember.findById(id).populate('user').populate('family');
};

export const deleteFamilyMember = async (id: string) => {
	return FamilyMember.findByIdAndDelete(id);
};
