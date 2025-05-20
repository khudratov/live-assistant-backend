import { Request, Response } from "express";
import mongoose from "mongoose";
import {
	createWallet,
	deleteWallet,
	getAllWallets,
	getWalletById,
	updateWalletBalance
} from "../services/wallet.service";


export const handleCreateWallet = async (req: Request, res: Response) => {
	try {
		const { balance, familyMember } = req.body;
		const wallet = await createWallet(balance, new mongoose.Types.ObjectId(familyMember));
		res.status(201).json(wallet);
	} catch (error) {
		res.status(500).json({ message: "Error creating wallet", error });
	}
};

export const handleGetWallet = async (req: Request, res: Response) => {
	try {
		const wallet = await getWalletById(new mongoose.Types.ObjectId(req.params.id));
		if (!wallet) {
			res.status(404).json({message: "Wallet not found"});
			return
		}
		res.json(wallet);
	} catch (error) {
		res.status(500).json({ message: "Error fetching wallet", error });
	}
};

export const handleUpdateWallet = async (req: Request, res: Response) => {
	try {
		const { balance } = req.body;
		const wallet = await updateWalletBalance(
			new mongoose.Types.ObjectId(req.params.id),
			balance
		);
		if (!wallet) {
			res.status(404).json({message: "Wallet not found"});
			return
		}
		res.json(wallet);
	} catch (error) {
		res.status(500).json({ message: "Error updating wallet", error });
	}
};

export const handleDeleteWallet = async (req: Request, res: Response) => {
	try {
		const result = await deleteWallet(new mongoose.Types.ObjectId(req.params.id));
		if (!result) {
			res.status(404).json({message: "Wallet not found"});
			return
		}
		res.json({ message: "Wallet deleted" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting wallet", error });
	}
};

export const handleGetAllWallets = async (_req: Request, res: Response) => {
	try {
		const wallets = await getAllWallets();
		res.json(wallets);
	} catch (error) {
		res.status(500).json({ message: "Error fetching wallets", error });
	}
};
