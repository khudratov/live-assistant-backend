import { Types } from "mongoose";
import { Wallet } from "../models/wallet.model";

export const createWallet = async (balance: number, familyMember: Types.ObjectId) => {
	return await Wallet.create({ balance, familyMember });
};

export const getWalletById = async (id: Types.ObjectId) => {
	return Wallet.findById(id).populate("familyMember");
};

export const updateWalletBalance = async (id: Types.ObjectId, balance: number) => {
	return Wallet.findByIdAndUpdate(id, { balance }, { new: true });
};

export const deleteWallet = async (id: Types.ObjectId) => {
	return Wallet.findByIdAndDelete(id);
};

export const getAllWallets = async () => {
	return Wallet.find().populate("familyMember");
};
