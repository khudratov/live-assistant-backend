import { Request, Response } from 'express';
import { User } from "../models/user.model";
import { Family } from "../models/family.model";
import { FamilyMember } from "../models/family-member.model";
import { Wallet } from "../models/wallet.model";


export const getUserDetail = async (req: Request, res: Response) => {
	try {

		const userId = (req.user!).id;

		const user = await User.findById(userId).select('-password');

		if (!user) {
			res.status(404).json({message: 'User not found'});
			return
		}

		const families = await Family.find({user_id: userId});

		const familyMembers = await FamilyMember.find({user: userId}).populate('family');

		const familyMemberIds = familyMembers.map((fm) => fm._id);
		const wallets = await Wallet.find({familyMember: {$in: familyMemberIds}}).populate({
			path: 'familyMember',
			populate: {
				path: 'family',
			}
		});

		res.json({
			user,
			families,
			familyMembers,
			wallets,
		});
	} catch (error: any) {
		console.error(error);
		res.status(500).json({message: error.message || 'Internal Server Error'});
	}
};

